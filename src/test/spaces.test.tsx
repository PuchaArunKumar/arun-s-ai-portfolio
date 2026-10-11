import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import axe from "axe-core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AppRoutes } from "@/App";
import { abilitiverseLive, radar } from "@/content/site";
import { localToday, parseRadarFeed, sortRadar } from "@/lib/radar";

const FEED = {
  schema: 1,
  updated: "2026-10-11",
  next_run: "Mon 19 Oct 2026, 07:53 IST",
  items: [
    { id: "j1", kind: "job", title: "Accessibility ML Engineer", org: "AT Co", location: "Bengaluru", url: "https://at.example.com/jobs/1", summary: "ML for screen-reader users.", added: "2026-10-11" },
    { id: "e1", kind: "event", title: "CSUN AT Conference", org: "CSUN", url: "https://csun.example.edu/at", date: "2099-03-08", date_end: "2099-03-12" },
    { id: "g1", kind: "grant", title: "AT Innovation Grant", org: "Fund", url: "https://fund.example.org/call", deadline: "2099-12-01" },
    { id: "bad", kind: "grant", title: "Unsafe", url: "javascript:alert(1)" },
    { id: "p1", kind: "connection", title: "A private contact", url: "https://example.com/p" },
  ],
};

const respond = (body: unknown, ok = true) =>
  Promise.resolve({ ok, status: ok ? 200 : 500, json: () => Promise.resolve(body) } as Response);

const renderAt = (path: string) =>
  render(
    <ThemeProvider attribute="class" defaultTheme="light">
      <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppRoutes />
      </MemoryRouter>
    </ThemeProvider>,
  );

const headingLevels = (container: HTMLElement) =>
  [...container.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => Number(h.tagName[1]));

const axeViolations = async (container: HTMLElement) =>
  // iframes: false — the embedded site is another origin, audited in its own repo.
  (await axe.run(container, { iframes: false, rules: { "color-contrast": { enabled: false } } })).violations.map(
    (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
  );

beforeEach(() => {
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  vi.stubGlobal("fetch", vi.fn(() => respond(FEED)));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("page bar", () => {
  it("marks the current page and offers the neighbours", () => {
    renderAt("/abilitiverse");
    const bar = screen.getByRole("navigation", { name: "Pages" });
    expect(within(bar).getByRole("link", { name: "Abilitiverse" })).toHaveAttribute("aria-current", "page");
    expect(within(bar).getByRole("link", { name: "Portfolio" })).not.toHaveAttribute("aria-current");
    expect(within(bar).getByRole("link", { name: "Previous page: Portfolio" })).toHaveAttribute("href", "/");
    expect(within(bar).getByRole("link", { name: "Next page: Opportunity Radar" })).toHaveAttribute("href", "/radar");
  });

  it("gives every tab its full name, whatever the screen width", () => {
    renderAt("/");
    const bar = screen.getByRole("navigation", { name: "Pages" });
    expect(within(bar).getAllByRole("link").map((a) => a.textContent)).toEqual(
      expect.arrayContaining([expect.stringContaining("Opportunity Radar")]),
    );
    expect(within(bar).queryByRole("link", { name: /Previous page/ })).toBeNull();
  });

  it("moves to the next page on a left swipe and back on a right swipe", async () => {
    const { container } = renderAt("/");
    const root = container.querySelector(".spaces")!;
    const swipe = (fromX: number, toX: number) => {
      fireEvent.touchStart(root, { touches: [{ clientX: fromX, clientY: 300 }] });
      fireEvent.touchEnd(root, { changedTouches: [{ clientX: toX, clientY: 310 }] });
    };
    await act(async () => swipe(300, 100));
    expect(screen.getByRole("heading", { level: 1, name: abilitiverseLive.title })).toBeInTheDocument();
    await act(async () => swipe(100, 300));
    expect(screen.getByRole("navigation", { name: "Sections" })).toBeInTheDocument();
  });

  it("ignores a mostly vertical drag", async () => {
    const { container } = renderAt("/");
    const root = container.querySelector(".spaces")!;
    await act(async () => {
      fireEvent.touchStart(root, { touches: [{ clientX: 300, clientY: 100 }] });
      fireEvent.touchEnd(root, { changedTouches: [{ clientX: 200, clientY: 500 }] });
    });
    expect(screen.getByRole("navigation", { name: "Sections" })).toBeInTheDocument();
  });

  it("sets the tab title for each page", () => {
    renderAt("/radar");
    expect(document.title).toBe("Opportunity Radar — Pucha Arun Kumar");
  });
});

describe("Abilitiverse page", () => {
  it("embeds the live site with a title and keeps a way out to the full site", async () => {
    const { container } = renderAt("/abilitiverse");
    const frame = screen.getByTitle(abilitiverseLive.frameTitle);
    expect(frame.tagName).toBe("IFRAME");
    expect(frame).toHaveAttribute("src", abilitiverseLive.url);
    const full = screen.getByRole("link", { name: /Open the full site/ });
    expect(full).toHaveAttribute("href", abilitiverseLive.url);
    expect(full).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("status")).toHaveTextContent("Loading the live site");
    fireEvent.load(frame);
    expect(screen.queryByRole("status")).toBeNull();
    expect(headingLevels(container).filter((l) => l === 1)).toHaveLength(1);
    expect(await axeViolations(container)).toEqual([]);
  });
});

describe("Radar page", () => {
  it("lists the public feed by kind and drops anything unsafe or private", async () => {
    const { container } = renderAt("/radar");
    expect(await screen.findByRole("heading", { level: 3, name: /Accessibility ML Engineer/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /CSUN AT Conference/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /AT Innovation Grant/ })).toBeInTheDocument();
    expect(screen.queryByText("Unsafe")).toBeNull();
    expect(screen.queryByText("A private contact")).toBeNull();
    expect(screen.getByText("3 open listings")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(radar.feedUrl, { cache: "no-cache" });

    const link = screen.getByRole("link", { name: /Accessibility ML Engineer/ });
    expect(link).toHaveAttribute("href", "https://at.example.com/jobs/1");
    expect(link).toHaveAttribute("target", "_blank");

    const levels = headingLevels(container);
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    levels.forEach((level, i) => {
      if (i > 0) expect(level - levels[i - 1]).toBeLessThanOrEqual(1);
    });
    expect(await axeViolations(container)).toEqual([]);
  });

  it("says when the feed cannot be loaded, and can retry", async () => {
    let fail = true;
    vi.stubGlobal("fetch", vi.fn(() => (fail ? respond(null, false) : respond(FEED))));
    renderAt("/radar");
    expect(await screen.findByRole("alert")).toHaveTextContent(radar.error);
    fail = false;
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByRole("heading", { level: 3, name: /AT Innovation Grant/ })).toBeInTheDocument();
  });

  it("explains an empty feed", async () => {
    vi.stubGlobal("fetch", vi.fn(() => respond({ schema: 1, items: [] })));
    renderAt("/radar");
    expect(await screen.findByText(radar.empty)).toBeInTheDocument();
  });
});

describe("radar feed parsing", () => {
  it("drops closed items and sorts each kind", () => {
    const today = "2026-10-11";
    const feed = parseRadarFeed(
      { items: [
        { id: "a", kind: "grant", title: "Rolling", url: "https://a.example.com" },
        { id: "b", kind: "grant", title: "Soon", url: "https://b.example.com", deadline: "2026-10-20" },
        { id: "c", kind: "grant", title: "Closed", url: "https://c.example.com", deadline: "2026-10-01" },
        { id: "d", kind: "event", title: "Bad date", url: "https://d.example.com", date: "2026-02-30" },
      ] },
      today,
    );
    expect(sortRadar(feed.items.filter((i) => i.kind === "grant")).map((i) => i.title)).toEqual(["Soon", "Rolling"]);
    expect(feed.items.find((i) => i.title === "Bad date")?.date).toBeUndefined();
    expect(localToday(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

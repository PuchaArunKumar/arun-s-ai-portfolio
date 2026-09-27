import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import axe from "axe-core";
import { describe, it, expect } from "vitest";
import Index from "@/pages/Index";

const renderSite = () =>
  render(
    <ThemeProvider attribute="class" defaultTheme="light">
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Index />
      </MemoryRouter>
    </ThemeProvider>,
  );

describe("portfolio page", () => {
  it("has exactly one h1 and no skipped heading levels", () => {
    const { container } = renderSite();
    const levels = [...container.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => Number(h.tagName[1]));
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    levels.forEach((level, i) => {
      if (i > 0) expect(level - levels[i - 1]).toBeLessThanOrEqual(1);
    });
  });

  it("points every in-page link at an element that exists", () => {
    const { container } = renderSite();
    const anchors = [...container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
    expect(anchors.length).toBeGreaterThan(0);
    for (const a of anchors) {
      const id = a.getAttribute("href")!.slice(1);
      expect(container.querySelector(`[id="${id}"]`), `#${id}`).not.toBeNull();
    }
  });

  it("opens off-site links safely in a new tab", () => {
    const { container } = renderSite();
    const external = [...container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')];
    expect(external.length).toBeGreaterThan(0);
    for (const a of external) {
      expect(a.target, a.href).toBe("_blank");
      expect(a.rel, a.href).toContain("noopener");
    }
  });

  it("does not publish a phone number", () => {
    const { container } = renderSite();
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
    expect(container.textContent).not.toMatch(/\+?91[\s-]?\d{10}|\b\d{10}\b/);
  });

  it("does not publish a student roll number", () => {
    const { container } = renderSite();
    expect(container.textContent).not.toMatch(/\b\d{2}[A-Z]{2}\d{2}[A-Z]\d{2}\b/i);
  });

  // Claims the repositories do not support. See src/content/site.ts before adding any back.
  it.each([
    "Scopus",
    "Bentham",
    "clinical-grade",
    "Clinical-grade",
    "Gaussian Splatting",
    "Neural Radiance",
    "85.45",
    "180k",
    "multimodal",
    "45.2",
    "Available July 2025",
  ])("does not claim %s", (phrase) => {
    const { container } = renderSite();
    expect(container.textContent).not.toContain(phrase);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderSite();
    // jsdom cannot compute colour, so contrast is checked in the browser instead.
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
});

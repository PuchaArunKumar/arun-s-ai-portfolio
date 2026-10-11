/*
  The Opportunity Radar's public feed, as published on the Abilitiverse site.

  A weekly research run writes it, so it is treated as untrusted input:
  unknown kinds, links that are not plain http(s), malformed dates and anything
  already closed are dropped here rather than rendered. Kept in step with
  src/lib/radar.ts in PuchaArunKumar/abiliverse-connect.
*/

export type RadarKind = 'job' | 'event' | 'grant';

export type RadarItem = {
  id: string;
  kind: RadarKind;
  title: string;
  url: string;
  org?: string;
  location?: string;
  date?: string;
  dateEnd?: string;
  deadline?: string;
  summary?: string;
  added?: string;
};

export type RadarFeed = { updated: string | null; nextRun: string | null; items: RadarItem[] };

const KINDS: RadarKind[] = ['job', 'event', 'grant'];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const isoDate = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined;
  const day = value.slice(0, 10);
  if (!ISO_DATE.test(day)) return undefined;
  const parsed = new Date(`${day}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(day) ? day : undefined;
};

const text = (value: unknown, max: number): string | undefined => {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
};

const isHttpUrl = (value: string) => {
  if (!/^https?:\/\/\S+$/i.test(value)) return false;
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};

export const localToday = (now = new Date()) =>
  `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

export const daysUntil = (date: string, today: string) =>
  Math.round((Date.parse(`${date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000);

/** Closed once the deadline, or without one the event's last day, is before today. */
export const isClosed = (item: Pick<RadarItem, 'deadline' | 'date' | 'dateEnd'>, today: string) =>
  item.deadline ? item.deadline < today : (item.dateEnd ?? item.date ?? '9999') < today;

export function parseRadarFeed(raw: unknown, today: string): RadarFeed {
  const data = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  const entries = Array.isArray(data.items) ? data.items : [];
  const items: RadarItem[] = [];
  const seen = new Set<string>();
  for (const entry of entries) {
    if (!entry || typeof entry !== 'object') continue;
    const e = entry as Record<string, unknown>;
    const title = text(e.title, 200);
    const url = typeof e.url === 'string' ? e.url.trim() : '';
    if (!KINDS.includes(e.kind as RadarKind) || !title || !isHttpUrl(url)) continue;
    const item: RadarItem = {
      id: text(e.id, 40) ?? url,
      kind: e.kind as RadarKind,
      title,
      url,
      org: text(e.org, 120),
      location: text(e.location, 120),
      date: isoDate(e.date),
      dateEnd: isoDate(e.date_end),
      deadline: isoDate(e.deadline),
      summary: text(e.summary, 400),
      added: isoDate(e.added),
    };
    if (seen.has(item.id) || isClosed(item, today)) continue;
    seen.add(item.id);
    items.push(item);
  }
  return { updated: isoDate(data.updated) ?? null, nextRun: text(data.next_run, 60) ?? null, items };
}

/** Events by start date, funding by deadline (rolling calls last), jobs newest first. */
export function sortRadar(items: RadarItem[]): RadarItem[] {
  const key = (item: RadarItem) =>
    item.kind === 'event'
      ? item.date ?? '9999'
      : item.kind === 'grant'
        ? item.deadline ?? '9999'
        : String(99999999 - Number((item.added ?? '0000-00-00').replace(/-/g, '')));
  return [...items].sort((a, b) => key(a).localeCompare(key(b)) || a.title.localeCompare(b.title));
}

export async function loadRadarFeed(url: string, today: string): Promise<RadarFeed> {
  const response = await fetch(url, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return parseRadarFeed(await response.json(), today);
}

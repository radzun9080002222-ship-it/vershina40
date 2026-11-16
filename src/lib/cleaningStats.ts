export const CLEANING_STATS_URL = 'https://apuajxotemukpjheppaz.supabase.co/functions/v1/cleaning-stats';
export const MAX_STATS_AGE_MS = 36 * 60 * 60 * 1000;

export function moscowMonth(now = Date.now()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Moscow', year: 'numeric', month: '2-digit',
  }).formatToParts(new Date(now));
  return `${parts.find(p => p.type === 'year')?.value}-${parts.find(p => p.type === 'month')?.value}`;
}

export function parseMonthlyArea(payload: unknown, now = Date.now()): number | null {
  if (!payload || typeof payload !== 'object') return null;
  const value = payload as Record<string, unknown>;
  if (value.scope !== 'all-cities' || value.month !== moscowMonth(now)) return null;
  if (typeof value.area !== 'number' || !Number.isFinite(value.area) || value.area < 0) return null;
  if (typeof value.updatedAt !== 'string') return null;
  const age = now - Date.parse(value.updatedAt);
  if (!Number.isFinite(age) || age < -60_000 || age > MAX_STATS_AGE_MS) return null;
  return value.area;
}

export async function requestMonthlyArea(signal: AbortSignal): Promise<number> {
  const response = await fetch(CLEANING_STATS_URL, { signal, cache: 'no-store' });
  if (!response.ok) throw new Error('Statistics unavailable');
  const area = parseMonthlyArea(await response.json());
  if (area === null) throw new Error('Statistics are stale or invalid');
  return area;
}

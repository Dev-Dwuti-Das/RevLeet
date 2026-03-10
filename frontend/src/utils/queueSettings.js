export const DEFAULT_BUFFER_SETTINGS = {
  Q1Seconds: 30,
  Q3Seconds: 15 * 24 * 60 * 60,
};

export const SECONDS_PER_DAY = 24 * 60 * 60;

export function formatDuration(seconds) {
  const value = Number(seconds);
  if (!Number.isFinite(value) || value <= 0) return "0 sec";
  if (value < 60) return `${value} sec`;
  if (value % (24 * 60 * 60) === 0) return `${value / (24 * 60 * 60)} day${value === 24 * 60 * 60 ? "" : "s"}`;
  if (value % (60 * 60) === 0) return `${value / (60 * 60)} hr${value === 60 * 60 ? "" : "s"}`;
  if (value % 60 === 0) return `${value / 60} min`;
  return `${value} sec`;
}

export function secondsToDays(seconds) {
  const value = Number(seconds);
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Number((value / SECONDS_PER_DAY).toFixed(4));
}

export function daysToSeconds(days) {
  const value = Number(days);
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Math.round(value * SECONDS_PER_DAY);
}

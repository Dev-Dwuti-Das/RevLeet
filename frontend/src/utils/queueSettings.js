export const DEFAULT_BUFFER_SETTINGS = {
  Q1Seconds: 30,
  Q3Seconds: 15 * 24 * 60 * 60,
};

export function formatDuration(seconds) {
  const value = Number(seconds);
  if (!Number.isFinite(value) || value <= 0) return "0 sec";
  return `${value} sec`;
}

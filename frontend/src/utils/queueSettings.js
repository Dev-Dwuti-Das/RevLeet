export const DEFAULT_BUFFER_SETTINGS = {
  Q1Seconds: 30,
  Q3Seconds: 15 * 24 * 60 * 60,
};

export function formatDuration(seconds) {
  const value = Number(seconds);
  if (!Number.isFinite(value) || value <= 0) return "0 sec";
  if (value < 60) return `${value} sec`;
  if (value % (24 * 60 * 60) === 0) return `${value / (24 * 60 * 60)} day${value === 24 * 60 * 60 ? "" : "s"}`;
  if (value % (60 * 60) === 0) return `${value / (60 * 60)} hr${value === 60 * 60 ? "" : "s"}`;
  if (value % 60 === 0) return `${value / 60} min`;
  return `${value} sec`;
}

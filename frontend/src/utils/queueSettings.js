export const DEFAULT_BUFFER_SETTINGS = {
  Q1Days: 1,
  Q3Days: 15,
};

export function formatDuration(days) {
  const value = Number(days);
  if (!Number.isFinite(value) || value <= 0) return "0 days";
  return `${value} day${value === 1 ? "" : "s"}`;
}

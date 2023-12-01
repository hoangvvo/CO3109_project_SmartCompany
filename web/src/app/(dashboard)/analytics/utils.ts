export const toHours = (seconds: number | undefined) => {
  if (typeof seconds !== "number") return undefined;
  return Number((seconds / 3600).toFixed(2));
};

export const toKiloWattHours = (wattSeconds: number | undefined) => {
  if (typeof wattSeconds !== "number") return undefined;
  return Number((wattSeconds / 3600000).toFixed(2));
};

export const secondsToMinutes = (seconds: number): number => {
  const secondsInMinute = 60;
  return Math.round(seconds / secondsInMinute);
};

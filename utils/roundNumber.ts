export const roundNum = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 10) / 10;
};

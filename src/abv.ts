export const MIN_GRAVITY = 1;
export const MAX_GRAVITY = 1.999;

export const getAbv = ({ og, fg }: { og?: number; fg?: number }): number => {
  if (!og || !fg) return 0;
  if (og < MIN_GRAVITY || fg < MIN_GRAVITY) return 0;
  if (og > MAX_GRAVITY || fg > MAX_GRAVITY) return 0;
  return Math.floor((og - fg) * 131.25 * 100) / 100;
};

export const gravityMessage = (value: number): string => {
  if (Number.isNaN(value)) return '';
  if (value < MIN_GRAVITY) return 'Gravity must be greater than 0.999';
  if (value > MAX_GRAVITY) return 'Gravity must be 1.999 or less';
  return '';
};

export const getRateStatus = (rate: number) => {
  if (rate >= 70) return { text: 'text-emerald-600', bg: 'bg-emerald-500' };
  if (rate >= 40) return { text: 'text-amber-500', bg: 'bg-amber-400' };
  return { text: 'text-red-500', bg: 'bg-red-400' };
};
export const getStrengthColor = (strength: number) => {
  if (strength === 0) return 'bg-gray-200';
  if (strength <= 0.25) return 'bg-red-500';
  if (strength <= 0.5) return 'bg-orange-500';
  if (strength <= 0.75) return 'bg-yellow-500';
  return 'bg-green-500';
};

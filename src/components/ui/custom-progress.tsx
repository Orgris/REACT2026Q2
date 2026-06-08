import { getStrengthColor } from '../../utils/getStrengthColor';

export const CustomProgress = ({ strength }: { strength: number }) => {
  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-lg bg-(--bg)">
      <div
        className={`
          h-full rounded-full transition-all duration-500 ease-out
          ${getStrengthColor(strength)}
        `}
        style={{ width: `${strength * 100}%` }}
      />
    </div>
  );
};

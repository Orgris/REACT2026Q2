import type { InputHTMLAttributes } from 'react';
import { getStrengthColor } from '../../utils/getStrengthColor';

type ButtonProps = {
  strength: number;
} & InputHTMLAttributes<HTMLInputElement>;

export const CustomProgress = ({ strength, className = '' }: ButtonProps) => {
  return (
    <div
      className={`
        my-1.75 min-h-1.5 w-full overflow-hidden rounded-lg bg-(--bg)
        ${className}
      `}
    >
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

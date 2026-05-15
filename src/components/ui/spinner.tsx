import PokeballIcon from '../../assets/pokeball.svg?react';

type SpinnerProps = {
  className?: string;
};

export function Spinner(props: SpinnerProps) {
  const { className = '' } = props;

  return (
    <div
      role="status"
      aria-label="loading spinner"
      className="flex w-full grow items-center justify-center"
    >
      <PokeballIcon
        data-testid="spinner"
        className={`absolute animate-spin text-[var(--border)] [animation-duration:5s] ${className}`}
      />
    </div>
  );
}

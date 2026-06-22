import PokeballIcon from '../../assets/pokeball.svg';

type SpinnerProps = {
  className?: string;
  classNameBG?: string;
};

export function Spinner(props: SpinnerProps) {
  const { classNameBG = '', className = '' } = props;

  return (
    <div
      role="status"
      aria-label="loading spinner"
      className={`
        flex w-full grow items-center justify-center
        ${classNameBG}
      `}
    >
      <PokeballIcon
        data-testid="spinner"
        className={`
          absolute animate-spin text-(--border) [animation-duration:5s]
          ${className}
        `}
      />
    </div>
  );
}

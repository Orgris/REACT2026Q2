type ErrorMessageProps = {
  error: string | undefined;
};

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <span
      className={`
        block min-h-5 text-xs text-red-400 transition-opacity duration-300
        ${error ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {error}
    </span>
  );
}

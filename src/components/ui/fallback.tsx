import { Button } from './button/button';

type FallbackProps = {
  errorMessage: string;
};

export function Fallback(props: FallbackProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div
      data-testid="fallback"
      className="flex grow flex-col items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-6"
    >
      <p className="text-2xl font-bold text-[var(--text-h)]">
        {props.errorMessage}
      </p>
      <p>Please try again later or refresh the page</p>
      <Button onClick={handleRefresh}>Refresh</Button>
    </div>
  );
}

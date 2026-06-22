import { Button } from './button/button';

type FallbackProps = {
  errorMessage: string;
  onReset?: () => void;
};

export function Fallback({ errorMessage, onReset }: FallbackProps) {
  const handleRefresh = () => {
    if (onReset) {
      onReset();
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      data-testid="fallback"
      className="
        flex grow flex-col items-center justify-center gap-2 rounded-lg border
        border-(--border) bg-(--bg) p-6
      "
    >
      <p className="text-2xl font-bold text-(--text-h)">{errorMessage}</p>
      <p>Please try again later or refresh the page</p>
      <Button onClick={handleRefresh}>
        {onReset ? 'Try Again' : 'Refresh'}
      </Button>
    </div>
  );
}

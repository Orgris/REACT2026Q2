import { useTranslations } from 'next-intl';
import { Button } from './button/button';

type FallbackProps = {
  errorMessage: string;
  onReset?: () => void;
};

export function Fallback({ errorMessage, onReset }: FallbackProps) {
  const t = useTranslations('Fallback');

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
      <p>{t('tryAgain')}</p>
      <Button onClick={handleRefresh}>
        {onReset ? t('reset') : t('refresh')}
      </Button>
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { Button } from '../../../components/ui/button/button';

export default function NotFound() {
  const t = useTranslations('NotFound');

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <section
      className="
        flex grow flex-col items-center justify-center gap-5 bg-(--bg) p-6
      "
    >
      <div className="flex items-end gap-2">
        <h2 className="m-0! text-9xl!">404</h2>
        <p className="mb-1.75!">{t('message')}</p>
      </div>

      <Button onClick={goHome}>{t('goHome')}</Button>
    </section>
  );
}

import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';

type SearchProps = {
  children: ReactNode;
};

export function Search(props: SearchProps) {
  const t = useTranslations('Search');

  return (
    <div
      data-testid="search"
      className="
        flex flex-col gap-2 rounded-lg border border-(--border) bg-(--bg) p-6
        text-left
      "
    >
      <div>
        <h2>{t('title')}</h2>
        <p>{t('subtitle')}</p>
      </div>
      {props.children}
    </div>
  );
}

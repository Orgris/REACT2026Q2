import { setRequestLocale } from 'next-intl/server';
import { LinkCard } from '../../../components/link-card/link-card';
import { useTranslations } from 'next-intl';
import { use } from 'react';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default function About({ params }: Props) {
  const { locale } = use(params);

  setRequestLocale(locale);

  const t = useTranslations('About');

  return (
    <div className="flex grow flex-col">
      <section
        className="
          flex grow flex-col items-center justify-center gap-8 rounded-lg border
          border-(--border) bg-(--bg) p-6 text-left
        "
      >
        <div className="flex max-w-3/4 flex-col items-center justify-center">
          <h2>{t('about')}</h2>

          <p className="text-center">
            <span className="bg-(--rss) px-1 font-extrabold text-(--rss-text)">
              RS School
            </span>
            <span
              className="
                px-2 text-(--rss) [-webkit-text-stroke:10px_var(--pokemon-blue)]
                [paint-order:stroke_fill] [text-stroke:10px_var(--pokemon-blue)]
              "
              style={{ fontFamily: 'var(--font-pokemon)' }}
            >
              Pokédex
            </span>{' '}
            {t('description')}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2>{t('technologies')}</h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div
              className="
                flex items-center gap-4 rounded-lg border-2 border-(--border)
                px-4 py-3
              "
            >
              <h4>{t('core')}</h4>
              <ul className="flex flex-wrap gap-2">
                <li
                  className="
                    rounded-lg border-2 border-[#61DAFB]/40 bg-[#61DAFB]/10 px-3
                    py-1 text-[#61DAFB]
                  "
                >
                  React
                </li>

                <li
                  className="
                    rounded-lg border-2 border-[#3178C6]/40 bg-[#3178C6]/10 px-3
                    py-1 text-[#3178C6]
                  "
                >
                  TypeScript
                </li>

                <li
                  className="
                    rounded-lg border-2 border-[#CA4245]/40 bg-[#CA4245]/10 px-3
                    py-1 text-[#CA4245]
                  "
                >
                  React Router
                </li>

                <li
                  className="
                    rounded-lg border-2 border-[#06B6D4]/40 bg-[#06B6D4]/10 px-3
                    py-1 text-[#06B6D4]
                  "
                >
                  Tailwind CSS
                </li>

                <li
                  className="
                    rounded-lg border-2 border-[#646CFF]/40 bg-[#646CFF]/10 px-3
                    py-1 text-[#A5B4FC]
                  "
                >
                  Vite
                </li>
              </ul>
            </div>

            <div
              className="
                flex items-center gap-4 rounded-lg border-2 border-(--border)
                px-4 py-3
              "
            >
              <h4>{t('qt')}</h4>
              <ul className="flex flex-wrap gap-2">
                <li
                  className="
                    rounded-lg border-2 border-[#4B32C3]/40 bg-[#4B32C3]/10 px-3
                    py-1 text-[#7C6CF2]
                  "
                >
                  ESLint
                </li>

                <li
                  className="
                    rounded-lg border-2 border-[#F7B93E]/40 bg-[#F7B93E]/10 px-3
                    py-1 text-[#F7B93E]
                  "
                >
                  Prettier
                </li>

                <li
                  className="
                    rounded-lg border-2 border-[#FF6B6B]/40 bg-[#FF6B6B]/10 px-3
                    py-1 text-[#FF6B6B]
                  "
                >
                  Husky
                </li>
              </ul>
            </div>

            <div
              className="
                flex items-center gap-4 rounded-lg border-2 border-(--border)
                px-4 py-3
              "
            >
              <h4>{t('testing')}</h4>
              <ul className="flex flex-wrap gap-2">
                <li
                  className="
                    rounded-lg border-2 border-[#38cc6e]/40 bg-[#38cc6e]/10 px-3
                    py-1 text-[#38cc6e]
                  "
                >
                  Vitest
                </li>

                <li
                  className="
                    rounded-lg border-2 border-[#E33332]/40 bg-[#E33332]/10 px-3
                    py-1 text-[#FF6B6B]
                  "
                >
                  Testing Library
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2>{t('links')}</h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <LinkCard
              href="https://rs.school/"
              imageSrc="https://rs.school/_next/static/media/rss-logo.c19ce1b4.svg"
              imageAlt="RS School logo"
              title="RS School"
              description={t('rss')}
            />

            <LinkCard
              href="https://rs.school/courses/reactjs"
              imageSrc="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              imageAlt="React logo"
              title="RS School React Course"
              description={t('rssReact')}
            />

            <LinkCard
              href="https://github.com/Orgris/REACT2026Q2"
              imageSrc="/GitHub_Invertocat_Black.svg"
              imageAlt="GitHub logo"
              title={t('repo')}
              description={t('source')}
            />

            <div className="w-full"></div>

            <LinkCard
              variant="personal"
              href="https://github.com/Orgris"
              imageSrc="https://github.com/Orgris.png"
              imageAlt="Orgris avatar"
              title="Orgris"
              description={t('developedBy')}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

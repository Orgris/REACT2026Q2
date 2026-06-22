import { Metadata } from 'next';
import '../../styles/index.css';
import { Suspense } from 'react';
import localFont from 'next/font/local';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Footer } from '../../components/ui/footer';
import { Header } from '../../components/ui/header';
import { Spinner } from '../../components/ui/spinner';
import { ThemeProvider } from '../../providers/theme-provider/theme-provider';
import { StoreProvider } from '../../store/provider';
import { ErrorBoundary } from '../../components/ui/error-boundary';
import { routing } from '../../i18n/routing';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'RS School Pokédex',
  description:
    'A Pokémon encyclopedia featuring search and detailed stats, developed for the RS School course.',
};

const pokemonFont = localFont({
  src: '../../../public/Pokemon_Solid.ttf',
  variable: '--font-pokemon',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  details,
  params,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html className={pokemonFont.variable}>
      <body>
        <NextIntlClientProvider>
          <StoreProvider>
            <ThemeProvider>
              <div id="root">
                <ErrorBoundary>
                  <Suspense
                    fallback={
                      <Spinner className="w-1/3" classNameBG="bg-(--bg)" />
                    }
                  >
                    <Header />

                    <main className="flex grow">
                      {children}
                      {details}
                    </main>

                    <Footer />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </ThemeProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

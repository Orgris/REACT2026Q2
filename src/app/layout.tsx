import { Metadata } from 'next';
import '../styles/index.css';
import { ThemeProvider } from './providers/theme-provider/theme-provider';
import { StoreProvider } from '../store/provider';
import { Header } from '../components/ui/header';
import { Footer } from '../components/ui/footer';
import { ErrorButton } from '../components/ui/button/error-button';
import { Suspense } from 'react';
import { Spinner } from '../components/ui/spinner';
import localFont from 'next/font/local';
import { ErrorBoundary } from '../components/ui/error-boundary';

export const metadata: Metadata = {
  title: 'RS School Pokédex',
  description:
    'A Pokémon encyclopedia featuring search and detailed stats, developed for the RS School course.',
};

const pokemonFont = localFont({
  src: '../../public/Pokemon_Solid.ttf',
  variable: '--font-pokemon',
});

export default function RootLayout({
  children,
  details,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
}) {
  return (
    <html lang="en" className={pokemonFont.variable}>
      <body>
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

                  <Footer>
                    <ErrorButton />
                  </Footer>
                </Suspense>
              </ErrorBoundary>
            </div>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

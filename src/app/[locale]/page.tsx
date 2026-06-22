'use client';

import { CardList } from '../../components/card-list/card-list';
import { Flyout } from '../../components/card-list/flyout';
import { Search } from '../../components/search/search';
import { SearchForm } from '../../components/search/search-form';
import { ErrorBoundary } from '../../components/ui/error-boundary';
import { Suspense } from 'react';
import { Spinner } from '../../components/ui/spinner';

export function Home() {
  return (
    <Suspense
      fallback={
        <Spinner
          className="w-1/5 text-(--border)"
          classNameBG="bg-(--bg) border-2 rounded-lg border-(--border)"
        />
      }
    >
      <ErrorBoundary>
        <div className="flex grow-2 flex-col">
          <Search>
            <SearchForm />
          </Search>

          <ErrorBoundary>
            <CardList />
          </ErrorBoundary>
        </div>

        <Flyout />
      </ErrorBoundary>
    </Suspense>
  );
}

export default Home;

import { Outlet, useLocation } from 'react-router';
import { CardList } from './card-list';
import { ErrorBoundary } from '../../ui/error-boundary';
import { Header } from '../../ui/header';
import { Search } from './search';
import { SearchForm } from './search-form';
import { ErrorButton } from '../../ui/error-button';
import { Footer } from '../../ui/footer';
import { Flyout } from '../../ui/flyout';

export function Home() {
  const location = useLocation();
  const hasDetailsPanel = location.pathname.includes('/details');

  return (
    <ErrorBoundary>
      <Header />

      <div className="flex">
        <main className="flex grow flex-col">
          <Search>
            <SearchForm />
          </Search>

          <ErrorBoundary>
            <CardList />
          </ErrorBoundary>
        </main>

        {hasDetailsPanel && <Outlet />}
      </div>

      <Footer>
        <ErrorButton />
      </Footer>

      <Flyout />
    </ErrorBoundary>
  );
}

export default Home;

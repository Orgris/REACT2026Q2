import { Outlet, useLocation } from 'react-router';
import { Flyout } from '../../components/card-list/flyout';
import { Search } from '../../components/search/search';
import { ErrorButton } from '../../components/ui/button/error-button';
import { ErrorBoundary } from '../../components/ui/error-boundary';
import { Footer } from '../../components/ui/footer';
import { Header } from '../../components/ui/header';
import { SearchForm } from '../../components/search/search-form';
import { CardList } from '../../components/card-list/card-list';

export function Home() {
  const location = useLocation();
  const hasDetailsPanel = location.pathname.includes('/details');

  return (
    <ErrorBoundary>
      <Header />

      <div className="flex grow">
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

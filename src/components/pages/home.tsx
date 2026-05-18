import { CardList } from '../card-list';
import { ErrorBoundary } from '../error-boundary';
import { Header } from '../header';
import { Search } from '../search';
import { SearchForm } from '../search-form';
import { ErrorButton } from '../ui/error-button';
import { Footer } from '../ui/footer';

export function Home() {
  return (
    <ErrorBoundary>
      <Header />

      <Search>
        <SearchForm />
      </Search>

      <ErrorBoundary>
        <CardList />
      </ErrorBoundary>

      <Footer>
        <ErrorButton />
      </Footer>
    </ErrorBoundary>
  );
}

export default Home;

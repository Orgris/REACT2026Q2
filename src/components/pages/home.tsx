import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CardList } from '../card-list';
import { ErrorBoundary } from '../error-boundary';
import { Header } from '../header';
import { Search } from '../search';
import { SearchForm } from '../search-form';
import { ErrorButton } from '../ui/error-button';
import { Footer } from '../ui/footer';

export function Home() {
  const [query, setQuery] = useLocalStorage('searchString');

  const handleSearchChange = (query: string) => {
    setQuery(query);
  };

  return (
    <ErrorBoundary>
      <Header />

      <Search>
        <SearchForm query={query} onSearchChange={handleSearchChange} />
      </Search>

      <ErrorBoundary>
        <CardList key={query} query={query} />
      </ErrorBoundary>

      <Footer>
        <ErrorButton />
      </Footer>
    </ErrorBoundary>
  );
}

export default Home;

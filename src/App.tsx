import { Outlet } from 'react-router';
import { ThemeProvider } from './providers/theme-provider';

export function App() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}

export default App;

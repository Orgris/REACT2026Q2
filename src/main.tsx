import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App';
import { Routes, Route, HashRouter } from 'react-router';
import Home from './components/pages/home/home';
import NotFound from './components/pages/not-found/not-found';
import About from './components/pages/about/about';
import { PokemonDetails } from './components/pages/home/pokemon-details';
import { Provider } from 'react-redux';
import { store } from './app/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />}>
              <Route index element={null} />
              <Route path="details" element={<PokemonDetails />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </StrictMode>
);

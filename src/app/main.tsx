import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import App from './App';
import { Routes, Route, HashRouter } from 'react-router';
import NotFound from '../pages/not-found/not-found';
import { PokemonDetails } from '../components/pokemon-details/pokemon-details';
import { Provider } from 'react-redux';
import { store } from '../store';
import About from '../pages/about/about';
import Home from '../pages/home/home';

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

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './components/pages/home';
import NotFound from './components/pages/not-found';
import About from './components/pages/about';
import { PokemonDetails } from './components/pokemon-details';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/REACT2026Q2/">
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
    </BrowserRouter>
  </StrictMode>
);

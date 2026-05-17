import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './components/pages/home';
import NotFound from './components/pages/not-found';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/REACT2026Q2">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DestinationPage from './pages/DestinationPage';
import OfferDetailPage from './pages/OfferDetailPage';
import ChiSiamoPage from './pages/ChiSiamoPage';
import ContattiPage from './pages/ContattiPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin — outside layout */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Public — with layout */}
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/croazia" element={<DestinationPage />} />
            <Route path="/sicilia" element={<DestinationPage />} />
            <Route path="/offerta/:id" element={<OfferDetailPage />} />
            <Route path="/chi-siamo" element={<ChiSiamoPage />} />
            <Route path="/contatti" element={<ContattiPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

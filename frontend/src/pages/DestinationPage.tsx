import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';
import OfferCard from '../components/ui/OfferCard';
import { DESTINATIONS, getWhatsAppLink } from '../lib/constants';
import { getOffersByDestination } from '../lib/api';
import type { Offer } from '../types';

const HERO_IMAGES: Record<string, string> = {
  croazia: 'https://images.unsplash.com/photo-1555990538-1e15f3a64b07?w=1920&q=80',
  sicilia: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1920&q=80',
};

export default function DestinationPage() {
  const location = useLocation();
  const slug = location.pathname.replace('/', '');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  const destination = DESTINATIONS.find((d) => d.slug === slug);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getOffersByDestination(slug)
      .then(setOffers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (!destination) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Destinazione non trovata</h1>
          <Link to="/" className="text-brand-600 underline">Torna alla home</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Vacanze in ${destination.name} | Mondoisole Tour Operator`}</title>
        <meta name="description" content={destination.description} />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGES[destination.slug]}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 mx-auto max-w-screen-xl w-full px-[5%] pb-12 pt-32">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-white/70 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">{destination.name}</span>
          </nav>
          <h1 className="text-white mb-3">Vacanze in {destination.name}</h1>
          <p className="text-white/80 text-lg max-w-2xl">{destination.description}</p>
        </div>
      </section>

      {/* Offers */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-screen-xl px-[5%]">
          <h2 className="text-brand-900 mb-8">
            Pacchetti disponibili
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : offers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 text-lg mb-4">
                Nessuna offerta disponibile al momento per questa destinazione.
              </p>
              <p className="text-gray-400 mb-6">
                Contattaci per essere aggiornato sulle prossime offerte!
              </p>
              <a
                href={getWhatsAppLink(`Ciao! Vorrei essere aggiornato sulle offerte per la ${destination.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-whatsapp text-white font-semibold py-3 px-6 rounded-full hover:brightness-110 transition"
              >
                Avvisami via WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

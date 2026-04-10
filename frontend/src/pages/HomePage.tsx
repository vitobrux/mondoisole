import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Shield, Clock, Users, Plane } from 'lucide-react';
import OfferCard from '../components/ui/OfferCard';
import DestinationCard from '../components/ui/DestinationCard';
import { SITE, DESTINATIONS, getWhatsAppLink } from '../lib/constants';
import { getFeaturedOffers } from '../lib/api';
import type { Offer } from '../types';

const DESTINATION_IMAGES: Record<string, string> = {
  croazia: 'https://images.unsplash.com/photo-1555990538-1e15f3a64b07?w=600&q=80',
  sicilia: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=600&q=80',
};

const STRENGTHS = [
  { icon: Clock, title: 'Oltre 20 anni', desc: 'di esperienza nel turismo organizzato' },
  { icon: Users, title: '30.000+ viaggiatori', desc: 'hanno scelto Mondoisole negli anni' },
  { icon: Plane, title: 'Da Catania', desc: 'voli e pacchetti con partenza dalla Sicilia' },
  { icon: Shield, title: 'Assistenza 24h', desc: 'supporto prima, durante e dopo il viaggio' },
];

export default function HomePage() {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    getFeaturedOffers()
      .then(setOffers)
      .catch(() => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>Mondoisole Tour Operator | Vacanze in Croazia e Sicilia da Catania</title>
        <meta name="description" content={SITE.description} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TravelAgency',
          name: 'Mondoisole Tour Operator',
          url: `https://${SITE.domain}`,
          logo: `https://${SITE.domain}/favicon.svg`,
          telephone: SITE.phone,
          email: SITE.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Via Gambino 15',
            addressLocality: 'Catania',
            postalCode: '95131',
            addressCountry: 'IT',
          },
          description: SITE.description,
          sameAs: Object.values(SITE.social),
        })}</script>
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/80 via-brand-900/50 to-transparent" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-[5%] py-20 w-full">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-block bg-accent-500/90 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              Stagione 2026
            </span>
            <h1 className="text-white text-balance leading-tight mb-4">
              Le tue vacanze da sogno<br />partono da Catania
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-8 max-w-xl">
              Croazia e Sicilia: pacchetti vacanza selezionati con oltre 20 anni di esperienza. Volo + hotel, tutto organizzato.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-whatsapp text-white font-bold py-4 px-8 rounded-full text-lg hover:brightness-110 transition shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Prenota ora
              </a>
              <a
                href="#destinazioni"
                className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-full text-lg hover:bg-white/25 transition border border-white/30"
              >
                Scopri le destinazioni <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section id="destinazioni" className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-[5%]">
          <div className="text-center mb-12">
            <h2 className="text-brand-900 mb-3">Le Nostre Destinazioni</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tre destinazioni straordinarie, un unico obiettivo: la tua vacanza perfetta.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest) => (
              <DestinationCard
                key={dest.slug}
                slug={dest.slug}
                name={dest.name}
                tagline={dest.tagline}
                image={DESTINATION_IMAGES[dest.slug]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED OFFERS ── */}
      {offers.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-[5%]">
            <div className="text-center mb-12">
              <h2 className="text-brand-900 mb-3">Offerte in Evidenza</h2>
              <p className="text-gray-600">Le migliori proposte selezionate per te.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.slice(0, 6).map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SOCIAL PROOF / STRENGTHS ── */}
      <section className="py-16 md:py-24 bg-brand-900 text-white">
        <div className="mx-auto max-w-screen-xl px-[5%]">
          <div className="text-center mb-12">
            <h2 className="text-white mb-3">Perch&eacute; scegliere Mondoisole</h2>
            <p className="text-brand-200 max-w-2xl mx-auto">
              Da oltre 20 anni organizziamo vacanze per i viaggiatori siciliani. 30.000 persone hanno gi&agrave; viaggiato con noi.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STRENGTHS.map((s) => (
              <div key={s.title} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-brand-800 rounded-2xl flex items-center justify-center">
                  <s.icon size={28} className="text-accent-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                <p className="text-brand-200 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-500 to-brand-700">
        <div className="mx-auto max-w-screen-xl px-[5%] text-center">
          <h2 className="text-white mb-4">Pronto per la tua prossima vacanza?</h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Contattaci su WhatsApp per ricevere un preventivo personalizzato. Rispondiamo in pochi minuti!
          </p>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-brand-700 font-bold py-4 px-10 rounded-full text-lg hover:shadow-xl transition shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-whatsapp"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Scrivici su WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

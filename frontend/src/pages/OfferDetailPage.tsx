import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Star, MapPin, Calendar, Check } from 'lucide-react';
import ContactForm from '../components/ui/ContactForm';
import { getOfferBySlug } from '../lib/api';
import { getWhatsAppOfferLink } from '../lib/constants';
import type { Offer } from '../types';

export default function OfferDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getOfferBySlug(id)
      .then(setOffer)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Offerta non trovata</h1>
          <Link to="/" className="text-brand-600 underline">Torna alla home</Link>
        </div>
      </div>
    );
  }

  const allImages = [offer.coverImage, ...offer.gallery].filter(Boolean);
  const stars = Array.from({ length: offer.hotelStars }, (_, i) => i);

  return (
    <>
      <Helmet>
        <title>{`${offer.title} | Mondoisole Tour Operator`}</title>
        <meta name="description" content={offer.shortDescription} />
      </Helmet>

      <div className="mx-auto max-w-screen-xl px-[5%] py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to={`/${offer.destination}`} className="hover:text-brand-600 transition-colors capitalize">
            {offer.destination}
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 line-clamp-1">{offer.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Gallery + Details */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            {allImages.length > 0 && (
              <div className="mb-8">
                <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-3">
                  <img
                    src={allImages[activeImage]}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          i === activeImage ? 'border-brand-500' : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Info */}
            <div className="flex items-center gap-2 mb-2">
              {stars.map((i) => (
                <Star key={i} size={18} className="fill-accent-400 text-accent-400" />
              ))}
            </div>
            <h1 className="text-brand-900 mb-2">{offer.title}</h1>
            <p className="flex items-center gap-1.5 text-gray-500 mb-6 capitalize">
              <MapPin size={18} /> {offer.destination}
            </p>

            {/* Description */}
            <div className="prose prose-gray max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{offer.fullDescription}</p>
            </div>

            {/* Services */}
            {offer.services.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Servizi inclusi</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {offer.services.map((service) => (
                    <div key={service} className="flex items-center gap-2 text-gray-700">
                      <Check size={18} className="text-success flex-shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dates */}
            {offer.datesAvailable && (
              <div className="bg-brand-50 p-5 rounded-xl mb-8">
                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-brand-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-brand-900 mb-1">Date disponibili</h4>
                    <p className="text-brand-700">{offer.datesAvailable}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">A partire da</p>
                <p className="text-4xl font-bold text-brand-800 mb-1">&euro;{offer.priceFrom}</p>
                <p className="text-sm text-gray-500 mb-6">{offer.priceType}</p>

                <a
                  href={getWhatsAppOfferLink(offer.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-whatsapp text-white font-bold py-4 rounded-xl text-lg hover:brightness-110 transition mb-3"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Prenota via WhatsApp
                </a>
                <p className="text-xs text-gray-400 text-center">Risposta in pochi minuti</p>
              </div>

              {/* Contact form */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Richiedi informazioni</h3>
                <ContactForm offerId={offer.id} offerTitle={offer.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

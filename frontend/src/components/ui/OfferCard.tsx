import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import type { Offer } from '../../types';

interface Props {
  offer: Offer;
}

export default function OfferCard({ offer }: Props) {
  const stars = Array.from({ length: offer.hotelStars }, (_, i) => i);

  return (
    <Link
      to={`/offerta/${offer.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={offer.coverImage || '/placeholder-offer.jpg'}
          alt={offer.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {offer.featured && (
          <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            In evidenza
          </span>
        )}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-brand-800 font-bold px-3 py-1.5 rounded-lg text-sm">
          da &euro;{offer.priceFrom}
          <span className="font-normal text-xs text-gray-500 block">{offer.priceType}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-1 mb-1">
          {stars.map((i) => (
            <Star key={i} size={14} className="fill-accent-400 text-accent-400" />
          ))}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
          {offer.title}
        </h3>
        <p className="flex items-center gap-1 text-sm text-gray-500 mt-1 capitalize">
          <MapPin size={14} />
          {offer.destination}
        </p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{offer.shortDescription}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {offer.services.slice(0, 3).map((s) => (
            <span key={s} className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">{s}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

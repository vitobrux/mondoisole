import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Props {
  slug: string;
  name: string;
  tagline: string;
  image: string;
}

export default function DestinationCard({ slug, name, tagline, image }: Props) {
  return (
    <Link
      to={`/${slug}`}
      className="group relative block rounded-2xl overflow-hidden aspect-[3/4] md:aspect-[4/5]"
    >
      <img
        src={image}
        alt={`Vacanze in ${name}`}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-1">{name}</h3>
        <p className="text-sm text-white/80 mb-3">{tagline}</p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-400 group-hover:gap-2 transition-all">
          Scopri le offerte <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}

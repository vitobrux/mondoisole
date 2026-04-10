export const SITE = {
  name: 'Mondoisole',
  tagline: 'Tour Operator',
  fullName: 'Mondoisole Tour Operator',
  description: 'Vacanze in Croazia e Sicilia da Catania. Pacchetti volo + hotel, tour organizzati. 20 anni di esperienza.',
  phone: '+39 095 88 38 995',
  mobile: '+39 348 178 2499',
  whatsappNumber: '393481782499',
  email: 'booking@mondoisole.net',
  address: 'Via Gambino 15 – 95131 Catania (CT)',
  piva: '01835190891',
  domain: 'mondoisole.net',
  social: {
    instagram: 'https://www.instagram.com/mondoisole/',
    facebook: 'https://www.facebook.com/mondoisole/',
    tiktok: 'https://www.tiktok.com/@mondoisole',
  },
  ga4Id: 'G-72HMT5X1EE',
} as const;

export const API_BASE = import.meta.env.PROD
  ? 'https://mondoisole.vito-brullo-brux.workers.dev/api'
  : 'http://localhost:8787/api';

export const DESTINATIONS = [
  {
    slug: 'croazia' as const,
    name: 'Croazia',
    tagline: 'Spiagge cristalline e borghi incantati',
    description: 'Scopri la magia della Dalmazia: da Makarska a Korčula, le coste croate ti aspettano con acque turchesi, tramonti mozzafiato e una gastronomia indimenticabile. Volo diretto da Catania.',
    color: 'brand',
    emoji: '',
  },
  {
    slug: 'sicilia' as const,
    name: 'Sicilia',
    tagline: 'La tua isola, come non l\'hai mai vista',
    description: 'Resort e villaggi selezionati per vivere la Sicilia in tutto il suo splendore. Da Taormina a San Vito Lo Capo, offerte esclusive per chi vuole restare vicino ma sentirsi lontano.',
    color: 'accent',
    emoji: '',
  },
] as const;

export const SERVICES_MAP: Record<string, string> = {
  volo: 'Volo incluso',
  hotel: 'Hotel',
  transfer: 'Transfer',
  colazione: 'Colazione',
  mezza_pensione: 'Mezza Pensione',
  pensione_completa: 'Pensione Completa',
};

export function getWhatsAppLink(message?: string): string {
  const text = message || `Ciao! Vorrei informazioni sulle vostre offerte vacanza.`;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppOfferLink(offerTitle: string): string {
  return getWhatsAppLink(`Ciao! Sono interessato/a all'offerta "${offerTitle}". Vorrei avere maggiori informazioni.`);
}

export interface Offer {
  id: string;
  title: string;
  destination: 'croazia' | 'sicilia';
  coverImage: string;
  gallery: string[];
  shortDescription: string;
  fullDescription: string;
  priceFrom: number;
  priceType: string;
  datesAvailable: string;
  services: string[];
  hotelStars: number;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  offerId?: string;
  createdAt: string;
  read: boolean;
}

export interface Destination {
  slug: 'croazia' | 'sicilia';
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  active: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'operator';
}

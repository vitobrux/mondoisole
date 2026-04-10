-- Mondoisole D1 Database Schema

CREATE TABLE IF NOT EXISTS offers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  destination TEXT NOT NULL DEFAULT 'croazia',
  cover_image TEXT DEFAULT '',
  gallery TEXT DEFAULT '[]',
  short_description TEXT DEFAULT '',
  full_description TEXT DEFAULT '',
  price_from REAL DEFAULT 0,
  price_type TEXT DEFAULT 'p.p.',
  dates_available TEXT DEFAULT '',
  services TEXT DEFAULT '[]',
  hotel_stars INTEGER DEFAULT 4,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published', 'archived')),
  featured INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_offers_destination ON offers(destination);
CREATE INDEX IF NOT EXISTS idx_offers_status ON offers(status);
CREATE INDEX IF NOT EXISTS idx_offers_featured ON offers(featured);

CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  message TEXT NOT NULL,
  offer_id TEXT,
  created_at TEXT NOT NULL,
  read INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at);

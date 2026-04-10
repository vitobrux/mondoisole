import { useState, type FormEvent } from 'react';
import { Upload, Loader2, X } from 'lucide-react';
import { adminCreateOffer, adminUpdateOffer, adminUploadImage } from '../../lib/api';
import { SERVICES_MAP } from '../../lib/constants';
import { stripHtml } from '../../lib/sanitize';
import type { Offer } from '../../types';

interface Props {
  token: string;
  offer: Offer | null;
  onSaved: () => void;
  onCancel: () => void;
}

const EMPTY: Partial<Offer> = {
  title: '', destination: 'croazia', coverImage: '', gallery: [],
  shortDescription: '', fullDescription: '', priceFrom: 0, priceType: 'p.p. in doppia',
  datesAvailable: '', services: [], hotelStars: 4, status: 'draft', featured: false,
};

export default function AdminOfferForm({ token, offer, onSaved, onCancel }: Props) {
  const [form, setForm] = useState<Partial<Offer>>(offer || EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  function update<K extends keyof Offer>(key: K, value: Offer[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleService(svc: string) {
    const services = form.services || [];
    update('services', services.includes(svc) ? services.filter((s) => s !== svc) : [...services, svc]);
  }

  async function handleUpload(files: FileList | null, target: 'cover' | 'gallery') {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const { url } = await adminUploadImage(token, file);
        if (target === 'cover') {
          update('coverImage', url);
        } else {
          update('gallery', [...(form.gallery || []), url]);
        }
      }
    } catch { setError('Errore upload immagine.'); }
    setUploading(false);
  }

  function removeGalleryImage(index: number) {
    update('gallery', (form.gallery || []).filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const data = {
      ...form,
      title: stripHtml(form.title || ''),
      shortDescription: stripHtml(form.shortDescription || ''),
      fullDescription: stripHtml(form.fullDescription || ''),
    };
    if (!data.title) { setError('Inserisci il titolo.'); return; }

    setSaving(true);
    try {
      if (offer?.id) {
        await adminUpdateOffer(token, offer.id, data);
      } else {
        await adminCreateOffer(token, data);
      }
      onSaved();
    } catch { setError('Errore nel salvataggio.'); }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{offer ? 'Modifica Offerta' : 'Nuova Offerta'}</h2>
        <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Titolo *</label>
          <input type="text" value={form.title} onChange={(e) => update('title', e.target.value)} maxLength={200}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition"
            placeholder="Es. Hotel Biokovo 4★ — Makarska" />
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destinazione *</label>
          <select value={form.destination} onChange={(e) => update('destination', e.target.value as Offer['destination'])}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition">
            <option value="croazia">Croazia</option>
            <option value="sicilia">Sicilia</option>
            <option value="albania">Albania</option>
          </select>
        </div>

        {/* Hotel Stars */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stelle Hotel</label>
          <select value={form.hotelStars} onChange={(e) => update('hotelStars', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition">
            {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} stelle</option>)}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prezzo di partenza (&euro;) *</label>
          <input type="number" value={form.priceFrom} onChange={(e) => update('priceFrom', Number(e.target.value))} min={0}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition" />
        </div>

        {/* Price Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipologia Prezzo</label>
          <input type="text" value={form.priceType} onChange={(e) => update('priceType', e.target.value)} maxLength={100}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition"
            placeholder="p.p. in doppia BB" />
        </div>

        {/* Short Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrizione Breve</label>
          <textarea value={form.shortDescription} onChange={(e) => update('shortDescription', e.target.value)} rows={2} maxLength={500}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition resize-y"
            placeholder="Breve descrizione per le card..." />
        </div>

        {/* Full Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrizione Completa</label>
          <textarea value={form.fullDescription} onChange={(e) => update('fullDescription', e.target.value)} rows={6} maxLength={5000}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition resize-y"
            placeholder="Descrizione dettagliata per la pagina dell'offerta..." />
        </div>

        {/* Dates */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Disponibili</label>
          <input type="text" value={form.datesAvailable} onChange={(e) => update('datesAvailable', e.target.value)} maxLength={200}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition"
            placeholder="Es. Luglio e Agosto 2026" />
        </div>

        {/* Services */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Servizi Inclusi</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(SERVICES_MAP).map(([key, label]) => (
              <button key={key} type="button" onClick={() => toggleService(key)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${
                  (form.services || []).includes(key)
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-brand-400'
                }`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cover Image */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Immagine di Copertina</label>
          {form.coverImage && (
            <div className="mb-2 relative inline-block">
              <img src={form.coverImage} alt="cover" className="h-32 rounded-xl object-cover" />
              <button type="button" onClick={() => update('coverImage', '')} className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow border"><X size={14} /></button>
            </div>
          )}
          <label className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-brand-400 transition">
            <Upload size={18} className="text-gray-400" />
            <span className="text-sm text-gray-500">{uploading ? 'Caricamento...' : 'Carica immagine di copertina'}</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files, 'cover')} disabled={uploading} />
          </label>
        </div>

        {/* Gallery */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Galleria Immagini</label>
          <div className="flex gap-2 flex-wrap mb-2">
            {(form.gallery || []).map((img, i) => (
              <div key={i} className="relative">
                <img src={img} alt="" className="h-20 w-24 rounded-lg object-cover" />
                <button type="button" onClick={() => removeGalleryImage(i)} className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow border"><X size={14} /></button>
              </div>
            ))}
          </div>
          <label className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-brand-400 transition">
            <Upload size={18} className="text-gray-400" />
            <span className="text-sm text-gray-500">{uploading ? 'Caricamento...' : 'Aggiungi immagini alla galleria'}</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleUpload(e.target.files, 'gallery')} disabled={uploading} />
          </label>
        </div>
      </div>

      {/* Status + Featured + Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 pt-4 border-t border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stato</label>
          <select value={form.status} onChange={(e) => update('status', e.target.value as Offer['status'])}
            className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition">
            <option value="draft">Bozza</option>
            <option value="published">Pubblicata</option>
            <option value="archived">Archiviata</option>
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.featured || false} onChange={(e) => update('featured', e.target.checked)}
            className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500" />
          <span className="text-sm text-gray-700">In evidenza (mostra in home)</span>
        </label>

        <div className="sm:ml-auto flex gap-3">
          <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition">Annulla</button>
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 disabled:opacity-60 transition">
            {saving ? <Loader2 size={18} className="animate-spin" /> : null}
            {offer ? 'Salva Modifiche' : 'Crea Offerta'}
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-error bg-red-50 p-3 rounded-lg">{error}</p>}
    </form>
  );
}

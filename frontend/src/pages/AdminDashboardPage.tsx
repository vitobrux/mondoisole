import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit2, Trash2, Star, LogOut, Inbox, Loader2 } from 'lucide-react';
import { adminGetOffers, adminDeleteOffer, adminGetContacts } from '../lib/api';
import type { Offer, ContactRequest } from '../types';
import AdminOfferForm from '../components/admin/AdminOfferForm';

interface Props {
  token: string;
  onLogout: () => void;
}

type View = 'offers' | 'create' | 'edit' | 'contacts';

export default function AdminDashboardPage({ token, onLogout }: Props) {
  const [view, setView] = useState<View>('offers');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);

  function loadOffers() {
    setLoading(true);
    adminGetOffers(token)
      .then(setOffers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  function loadContacts() {
    adminGetContacts(token)
      .then(setContacts)
      .catch(() => {});
  }

  useEffect(() => { loadOffers(); }, []);

  async function handleDelete(id: string) {
    if (!confirm('Eliminare questa offerta?')) return;
    try {
      await adminDeleteOffer(token, id);
      loadOffers();
    } catch { alert('Errore nella cancellazione.'); }
  }

  function handleEdit(offer: Offer) {
    setEditingOffer(offer);
    setView('edit');
  }

  function handleSaved() {
    setView('offers');
    setEditingOffer(null);
    loadOffers();
  }

  const STATUS_COLORS: Record<string, string> = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-yellow-100 text-yellow-700',
    archived: 'bg-gray-100 text-gray-500',
  };

  return (
    <>
      <Helmet><title>Gestionale | Mondoisole</title></Helmet>
      <div className="min-h-screen bg-gray-50">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="mx-auto max-w-screen-xl px-[5%] py-3 flex items-center justify-between">
            <h1 className="text-lg font-bold text-brand-900">Mondoisole Gestionale</h1>
            <button onClick={onLogout} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
              <LogOut size={16} /> Esci
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-screen-xl px-[5%] py-6">
          {/* Nav tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setView('offers')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${view === 'offers' ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
            >
              Offerte ({offers.length})
            </button>
            <button
              onClick={() => { setView('create'); setEditingOffer(null); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${view === 'create' ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
            >
              <Plus size={16} /> Nuova Offerta
            </button>
            <button
              onClick={() => { setView('contacts'); loadContacts(); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${view === 'contacts' ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
            >
              <Inbox size={16} /> Richieste
            </button>
          </div>

          {/* Offers List */}
          {(view === 'offers') && (
            loading ? (
              <div className="flex justify-center py-16"><Loader2 size={32} className="animate-spin text-brand-400" /></div>
            ) : offers.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-400 mb-4">Nessuna offerta presente.</p>
                <button onClick={() => setView('create')} className="text-brand-600 font-medium underline">Crea la prima offerta</button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Offerta</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Destinazione</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Prezzo</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Stato</th>
                        <th className="text-right px-4 py-3 font-medium text-gray-500">Azioni</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {offers.map((offer) => (
                        <tr key={offer.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              {offer.coverImage && (
                                <img src={offer.coverImage} alt="" className="w-12 h-9 rounded-lg object-cover" />
                              )}
                              <div>
                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                  {offer.title}
                                  {offer.featured && <Star size={14} className="fill-accent-400 text-accent-400" />}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 capitalize text-gray-600">{offer.destination}</td>
                          <td className="px-4 py-3 text-gray-600">&euro;{offer.priceFrom}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[offer.status]}`}>
                              {offer.status === 'published' ? 'Pubblicata' : offer.status === 'draft' ? 'Bozza' : 'Archiviata'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(offer)} className="p-1.5 text-gray-400 hover:text-brand-600 transition" title="Modifica">
                                <Edit2 size={16} />
                              </button>
                              <button onClick={() => handleDelete(offer.id)} className="p-1.5 text-gray-400 hover:text-error transition" title="Elimina">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}

          {/* Create / Edit Offer */}
          {(view === 'create' || view === 'edit') && (
            <AdminOfferForm
              token={token}
              offer={editingOffer}
              onSaved={handleSaved}
              onCancel={() => { setView('offers'); setEditingOffer(null); }}
            />
          )}

          {/* Contacts */}
          {view === 'contacts' && (
            contacts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-400">Nessuna richiesta ricevuta.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((c) => (
                  <div key={c.id} className={`bg-white rounded-xl border p-5 ${c.read ? 'border-gray-200' : 'border-brand-300 bg-brand-50/30'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">{c.name}</p>
                        <p className="text-sm text-gray-500">{c.email} {c.phone && `| ${c.phone}`}</p>
                        {c.offerId && <p className="text-xs text-brand-600 mt-1">Offerta: {c.offerId}</p>}
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0">{new Date(c.createdAt).toLocaleDateString('it-IT')}</span>
                    </div>
                    <p className="text-gray-700 mt-3 text-sm">{c.message}</p>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

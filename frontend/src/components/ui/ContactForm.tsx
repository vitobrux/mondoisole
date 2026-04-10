import { useState, type FormEvent } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { submitContactForm } from '../../lib/api';
import { validateEmail, validatePhone, stripHtml } from '../../lib/sanitize';

interface Props {
  offerId?: string;
  offerTitle?: string;
}

export default function ContactForm({ offerId, offerTitle }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    const name = stripHtml(form.name.trim());
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = stripHtml(form.message.trim());

    if (!name || name.length < 2) { setErrorMsg('Inserisci il tuo nome.'); return; }
    if (!validateEmail(email)) { setErrorMsg('Inserisci un indirizzo email valido.'); return; }
    if (phone && !validatePhone(phone)) { setErrorMsg('Numero di telefono non valido.'); return; }
    if (!message || message.length < 10) { setErrorMsg('Il messaggio deve contenere almeno 10 caratteri.'); return; }

    setStatus('sending');
    try {
      await submitContactForm({ name, email, phone, message, offerId });
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Errore nell\'invio. Riprova o contattaci via WhatsApp.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-8">
        <CheckCircle size={48} className="mx-auto text-success mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Messaggio inviato!</h3>
        <p className="text-gray-600">Ti risponderemo il prima possibile.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-brand-600 underline text-sm">
          Invia un altro messaggio
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {offerTitle && (
        <p className="text-sm text-gray-500 bg-brand-50 p-3 rounded-lg">
          Richiesta informazioni per: <strong>{offerTitle}</strong>
        </p>
      )}

      <div>
        <label htmlFor="cf-name" className="block text-sm font-medium text-gray-700 mb-1">Nome e Cognome *</label>
        <input
          id="cf-name"
          type="text"
          required
          maxLength={100}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition text-base"
          placeholder="Mario Rossi"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            id="cf-email"
            type="email"
            required
            maxLength={254}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition text-base"
            placeholder="mario@email.com"
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
          <input
            id="cf-phone"
            type="tel"
            maxLength={20}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition text-base"
            placeholder="+39 3XX XXX XXXX"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium text-gray-700 mb-1">Messaggio *</label>
        <textarea
          id="cf-message"
          required
          maxLength={2000}
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition text-base resize-y"
          placeholder="Scrivi qui la tua richiesta..."
        />
      </div>

      {errorMsg && (
        <p className="text-sm text-error bg-red-50 p-3 rounded-lg">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-center gap-2 bg-brand-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-brand-700 disabled:opacity-60 transition-colors text-base"
      >
        {status === 'sending' ? (
          <><Loader2 size={20} className="animate-spin" /> Invio in corso...</>
        ) : (
          <><Send size={18} /> Invia Richiesta</>
        )}
      </button>
    </form>
  );
}

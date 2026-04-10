import { Helmet } from 'react-helmet-async';
import { Award, Globe, HeadphonesIcon, Users, MapPin, Phone, Mail } from 'lucide-react';
import { SITE, getWhatsAppLink } from '../lib/constants';

const VALUES = [
  { icon: Award, title: 'Esperienza', desc: 'Oltre 20 anni nel settore del turismo organizzato, con partenza da Catania.' },
  { icon: Globe, title: 'Destinazioni Selezionate', desc: 'Croazia e Sicilia: solo le migliori strutture, verificate personalmente.' },
  { icon: HeadphonesIcon, title: 'Assistenza Continua', desc: 'Ti seguiamo prima, durante e dopo il viaggio con supporto dedicato.' },
  { icon: Users, title: 'Fiducia', desc: '30.000 viaggiatori ci hanno già scelto. La nostra forza è il passaparola.' },
];

export default function ChiSiamoPage() {
  return (
    <>
      <Helmet>
        <title>Chi Siamo | Mondoisole Tour Operator</title>
        <meta name="description" content="Mondoisole Tour Operator: oltre 20 anni di esperienza nel turismo organizzato da Catania. Scopri la nostra storia e i nostri valori." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-end overflow-hidden bg-brand-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80')` }}
        />
        <div className="relative z-10 mx-auto max-w-screen-xl w-full px-[5%] pb-12 pt-32">
          <h1 className="text-white mb-3">Chi Siamo</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            La storia di Mondoisole: passione per il viaggio, competenza e dedizione.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-screen-xl px-[5%]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-brand-900 mb-6">La Nostra Storia</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">Mondoisole</strong> nasce a Catania con un obiettivo chiaro: rendere il viaggio un'esperienza semplice, sicura e indimenticabile per tutti i siciliani.
              </p>
              <p>
                Da oltre 20 anni organizziamo vacanze verso le pi&ugrave; belle destinazioni del Mediterraneo. Siamo partiti con i voli charter verso la Croazia, portando circa <strong className="text-gray-900">30.000 persone</strong> a scoprire le coste dalmate.
              </p>
              <p>
                Oggi continuiamo con lo stesso spirito: selezioniamo le migliori strutture, costruiamo pacchetti su misura e offriamo un'assistenza personale che va dal primo contatto fino al ritorno a casa.
              </p>
              <p>
                La nostra sede &egrave; a Catania, in Via Gambino 15. Siamo un team di persone appassionate di viaggi, che conosce ogni destinazione perch&eacute; l'ha vissuta in prima persona.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-[5%]">
          <h2 className="text-brand-900 text-center mb-12">I Nostri Valori</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-brand-50 rounded-2xl flex items-center justify-center">
                  <v.icon size={28} className="text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-screen-xl px-[5%]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-brand-900 mb-6">Dove Trovarci</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center gap-2">
                <MapPin size={24} className="text-brand-600" />
                <p className="text-gray-700 text-sm">{SITE.address}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Phone size={24} className="text-brand-600" />
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="text-gray-700 text-sm hover:text-brand-600 transition-colors">{SITE.phone}</a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Mail size={24} className="text-brand-600" />
                <a href={`mailto:${SITE.email}`} className="text-gray-700 text-sm hover:text-brand-600 transition-colors">{SITE.email}</a>
              </div>
            </div>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp text-white font-bold py-4 px-8 rounded-full text-lg hover:brightness-110 transition shadow-lg"
            >
              Contattaci su WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

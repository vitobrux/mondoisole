import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '../components/ui/ContactForm';
import { SITE } from '../lib/constants';

export default function ContattiPage() {
  return (
    <>
      <Helmet>
        <title>Contatti | Mondoisole Tour Operator</title>
        <meta name="description" content="Contatta Mondoisole Tour Operator: telefono, email, WhatsApp e form di contatto. Sede a Catania, Via Gambino 15." />
      </Helmet>

      {/* Hero */}
      <section className="bg-brand-900 py-16 md:py-20">
        <div className="mx-auto max-w-screen-xl px-[5%]">
          <h1 className="text-white mb-3">Contattaci</h1>
          <p className="text-brand-200 text-lg">Siamo qui per aiutarti a organizzare la tua vacanza perfetta.</p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-screen-xl px-[5%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="text-brand-900 mb-6">I nostri recapiti</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} className="text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-0.5 text-base">Sede</h3>
                    <p className="text-gray-600">{SITE.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={22} className="text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-0.5 text-base">Telefono</h3>
                    <p className="text-gray-600">
                      Fisso: <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="text-brand-600 hover:underline">{SITE.phone}</a>
                    </p>
                    <p className="text-gray-600">
                      Mobile/WhatsApp: <a href={`tel:${SITE.mobile.replace(/\s/g, '')}`} className="text-brand-600 hover:underline">{SITE.mobile}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={22} className="text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-0.5 text-base">Email</h3>
                    <p className="text-gray-600">
                      <a href={`mailto:${SITE.email}`} className="text-brand-600 hover:underline">{SITE.email}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={22} className="text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-0.5 text-base">Orari</h3>
                    <p className="text-gray-600">Lun - Ven: 9:00 - 18:00</p>
                    <p className="text-gray-600">Sab: 9:00 - 13:00</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-2xl overflow-hidden h-64 bg-gray-100">
                <iframe
                  title="Sede Mondoisole Catania"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.5!2d15.087!3d37.502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVmlhIEdhbWJpbm8gMTUsIDk1MTMxIENhdGFuaWEgQ1Q!5e0!3m2!1sit!2sit!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-brand-900 mb-2 text-xl">Scrivici un messaggio</h2>
                <p className="text-gray-500 text-sm mb-6">Compila il form e ti risponderemo il prima possibile.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

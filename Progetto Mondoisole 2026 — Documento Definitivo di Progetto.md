# Progetto Mondoisole 2026 — Documento Definitivo di Progetto
**Restyling Completo e Nuova Architettura del Sito mondoisole.net**

> Documento redatto per il team allargato: sviluppatore, social media manager, booking e management.
> Fonte: Analisi tecnica del sito esistente + Trascrizione call stakeholder del 02/04/2026.

---

## Indice

1. [Contesto e Storia del Brand](#1-contesto-e-storia-del-brand)
2. [Analisi del Sito Attuale (AS-IS)](#2-analisi-del-sito-attuale-as-is)
3. [Decisioni Strategiche Emerse dalla Call](#3-decisioni-strategiche-emerse-dalla-call)
4. [Target di Riferimento e Funnel di Acquisizione](#4-target-di-riferimento-e-funnel-di-acquisizione)
5. [Offerta Commerciale 2026](#5-offerta-commerciale-2026)
6. [Architettura Tecnica del Nuovo Sito (TO-BE)](#6-architettura-tecnica-del-nuovo-sito-to-be)
7. [Requisiti Funzionali — Frontend (Sito Vetrina)](#7-requisiti-funzionali--frontend-sito-vetrina)
8. [Requisiti Funzionali — Backend (Mini-Gestionale)](#8-requisiti-funzionali--backend-mini-gestionale)
9. [Standard di Sviluppo: Sicurezza e Responsive Design](#9-standard-di-sviluppo-sicurezza-e-responsive-design)
10. [Strategia Social e Content Marketing](#10-strategia-social-e-content-marketing)
11. [Analisi SWOT Aggiornata](#11-analisi-swot-aggiornata)
12. [Roadmap Operativa](#12-roadmap-operativa)
13. [Riferimenti Tecnici e Accessi](#13-riferimenti-tecnici-e-accessi)

---

## 1. Contesto e Storia del Brand

**Mondoisole** è un Tour Operator con sede a Catania (Via Gambino 15, P.IVA 01835190891), attivo da oltre 20 anni nel settore del turismo organizzato. Il brand è storicamente legato ad **Alba Holidays**, il braccio operativo per le destinazioni balcaniche.

Il punto di forza storico dell'azienda è stato l'organizzazione di **voli charter da Catania** (operati tramite Luxwing) verso Croazia e Albania, con una programmazione estiva (luglio, agosto, settembre) che ha portato a far viaggiare circa **30.000 persone in 15 anni**, principalmente verso la Dalmazia. La rete agenziale costruita in questo periodo è un asset strategico importante e ancora attivo.

Il sito attuale (`mondoisole.net`) è stato sviluppato da un collaboratore albanese in WordPress, con un sistema di prenotazione online basato su allotment fissi e pagamento via PayPal. Tale sistema era funzionale quando l'azienda gestiva voli charter propri (fino a 20 aerei a stagione), ma è diventato obsoleto e inadatto alla struttura operativa attuale.

---

## 2. Analisi del Sito Attuale (AS-IS)

### 2.1 Profilo Tecnico

| Caratteristica | Dettaglio |
| :--- | :--- |
| **CMS** | WordPress (plugin BookYourTravel per la prenotazione) |
| **Hosting** | Cloudflare (CDN) + hosting esterno |
| **Dominio** | `mondoisole.net` (registrato probabilmente tramite Aruba/Registrar italiano, da verificare con Angelo Lo Bianco) |
| **Analytics** | Google Analytics 4 (via MonsterInsights, ID: `G-72HMT5X1EE`) |
| **SEO Plugin** | All in One SEO |
| **Schema.org** | Presente (Organization, WebPage, BreadcrumbList) — con incongruenza: il nome Organization è "Alba Holidays" invece di "Mondoisole" |
| **Ultima Modifica** | 09/05/2024 |

### 2.2 Struttura Attuale delle Pagine

Il sito è strutturato nelle seguenti sezioni principali:

*   **Home**: Slider hero, widget di ricerca (alloggio/tour/destinazione/data), offerte last minute Albania e Croazia.
*   **Vacanze**: Elenco pacchetti suddivisi per destinazione (Albania, Croazia).
*   **Tour**: Sezione per escursioni e visite guidate.
*   **Destinazioni**: Pagine dedicate a Sicilia, Croazia, Albania.
*   **Offerte**: Locandine PDF scaricabili (Albania, Croazia, Medjugorje 2024).
*   **Chi Siamo**: Presentazione aziendale, FAQ, contatti.

### 2.3 Problemi Critici Identificati

Il sito attuale presenta criticità strutturali che ne limitano fortemente l'efficacia commerciale.

**Problema di Identità e Comunicazione**: L'utente che atterra sul sito non capisce immediatamente cosa vende l'azienda. Il messaggio è troppo generico ("vacanze in Croazia, Albania, Sicilia") senza un posizionamento chiaro. La UX è "macchinosa" e non intuitiva, lontana dagli standard di Booking.com o Airbnb.

**Problema di Attualità dei Contenuti**: Il sito non è stato aggiornato con la programmazione 2025/2026. Non essendoci voli charter attivi, il sistema di prenotazione online è inutilizzabile e crea confusione. Le offerte mostrate sono datate al 2024.

**Problema di Architettura**: Il sistema WordPress con plugin di prenotazione complesso è sovradimensionato per l'attuale modello operativo (sito vetrina + contatto diretto). Il caricamento delle offerte richiede l'intervento dello sviluppatore esterno, rendendo impossibile l'aggiornamento autonomo settimanale da parte del team.

**Problema di Presenza Social**: La pagina Instagram conta circa 44 follower, Facebook circa 35. La presenza social è praticamente nulla e non può generare traffico organico verso il sito.

**Incongruenza Brand**: Nel codice sorgente (dati strutturati JSON-LD), il nome dell'organizzazione è "Alba Holidays" e il logo punta a `albaholiday.com`, creando confusione tra i due brand.

---

## 3. Decisioni Strategiche Emerse dalla Call

La call del 02/04/2026 ha chiarito definitivamente le scelte strategiche per il 2026.

### 3.1 Cosa SI fa
*   **Restyling completo** del sito, mantenendo il dominio `mondoisole.net` per non perdere l'indicizzazione SEO esistente.
*   **Sito vetrina dinamico** (non e-commerce): le offerte vengono mostrate con foto, titolo, descrizione e prezzo di partenza. La conversione avviene tramite contatto diretto (WhatsApp/email).
*   **Mini-gestionale interno** per permettere al team di caricare e aggiornare le offerte in autonomia, con cadenza settimanale.
*   **Croazia come core business**: pacchetti vacanza con volo da Catania (voli di linea disponibili).
*   **Sicilia**: offerte villaggi e soggiorni per il mercato locale siciliano.
*   **Albania**: mantenuta con soli 2-3 tour selezionati (non pacchetti mare generalisti).
*   **Strategia Social-First**: il sito è lo strumento di approfondimento e conversione per il traffico generato dai social (Instagram, TikTok, Facebook).
*   **Campagne ADV a pagamento**: obbligatorie e da avviare subito dopo Pasqua, dato il numero bassissimo di follower.

### 3.2 Cosa NON si fa (nel 2026)
*   **Nessun e-commerce diretto** con pagamento online e gestione allotment in tempo reale. Richiede un'organizzazione operativa (allotment, voli propri) che non è disponibile quest'anno.
*   **Nessuna area B2B** per agenzie partner (valutazione rimandata a post-stagione).
*   **Nessuna integrazione con The Sicily**: il progetto incoming per stranieri/nord Italia è un ecosistema separato e distinto.
*   **Nessuna migrazione del vecchio WordPress**: si riparte da zero con la nuova architettura.

### 3.3 Visione Futura (Post-Stagione 2026)
Al termine della stagione estiva, si valuterà l'opportunità di sviluppare un'area B2B per le agenzie partner della rete storica. L'azienda dispone di una rete agenziale consolidata che ha già lavorato con Mondoisole e potrebbe diventare un canale di distribuzione importante.

---

## 4. Target di Riferimento e Funnel di Acquisizione

### 4.1 Target Primario: Il Viaggiatore Siciliano (B2C)
Il pubblico principale è il residente in Sicilia (con focus su Catania e provincia) che cerca una vacanza organizzata per l'estate. Si tratta di famiglie, coppie e gruppi di amici che:
*   Non vogliono organizzare autonomamente volo + hotel.
*   Cercano un rapporto qualità/prezzo competitivo.
*   Preferiscono destinazioni raggiungibili con volo diretto da Fontanarossa.
*   Scoprono le offerte principalmente via social (Instagram, TikTok) e poi verificano sul sito.

### 4.2 Target Secondario: Agenzie di Viaggi Partner
Agenzie locali che cercano pacchetti da rivendere ai propri clienti. Questo target viene servito principalmente tramite contatto diretto (email/telefono) e non tramite il sito web nella fase attuale.

### 4.3 Funnel di Acquisizione (Social-First)

Il funnel è strutturato in tre fasi distinte, con il sito web che svolge un ruolo di **supporto e credibilità** rispetto ai social, non di canale primario di acquisizione.

| Fase | Canale | Azione | Obiettivo |
| :--- | :--- | :--- | :--- |
| **Awareness** | Instagram, TikTok, Facebook | Video "face-to-camera" della social media manager + Locandine offerte + Campagne ADV a pagamento | Generare interesse e far conoscere il brand |
| **Consideration** | Link in bio / Link nell'ADV | L'utente clicca e atterra sul sito vetrina | Visualizzare i dettagli dell'offerta, costruire fiducia |
| **Conversion** | WhatsApp / Email / Telefono | L'utente clicca sulla CTA e contatta l'agenzia | Finalizzare la prenotazione off-site |

> **Nota strategica**: Il sito da solo non genera traffico. Senza le campagne social e ADV, il sito non viene visto. Il sito è di **appoggio** ai social, non il contrario.

---

## 5. Offerta Commerciale 2026

### 5.1 Croazia (Core Business)
*   Pacchetti "volo + hotel" con partenza da Catania (voli di linea disponibili).
*   Destinazioni principali: Makarska Riviera, Korčula, Spalato.
*   Strutture selezionate: Hotel Biokovo, Hotel Makarska Sunny Resort, Aminess Port 9 Resort, Hotel Marko Polo.
*   Stagionalità: luglio, agosto, settembre.

### 5.2 Sicilia (Turismo di Prossimità)
*   Offerte villaggi e resort per siciliani che viaggiano in Sicilia.
*   Nessun volo necessario: solo hotel/resort con trattamento.
*   Aggiornamento settimanale delle offerte (tariffe dinamiche).
*   Possibilità di tour culturali su misura (Siracusa, Taormina, Agrigento, Palermo, Noto).

### 5.3 Albania (Ridimensionata)
*   Solo 2-3 tour selezionati (non pacchetti mare generalisti).
*   Focus su Saranda e Ksamil (non Tirana/Durazzo).
*   Motivazione: feedback negativi sul rapporto qualità/prezzo dei servizi alberghieri albanesi; l'Albania non giustifica ancora il prezzo richiesto rispetto alla Croazia.

### 5.4 Servizi MICE (Incentive, Congressi, Team Building)
*   Selezione di hotel 4-5 stelle in Sicilia, Albania e Croazia per eventi aziendali.
*   Attività sportive e naturalistiche (golf, trekking, vela, canoa).
*   Esperienze culturali siciliane (ceramica, cucina, vini).
*   Questo segmento viene gestito tramite contatto diretto (non sul sito vetrina).

---

## 6. Architettura Tecnica del Nuovo Sito (TO-BE)

Il progetto abbandona completamente WordPress in favore di un'architettura moderna, serverless e ad altissime prestazioni basata sull'ecosistema Cloudflare.

### 6.1 Stack Tecnologico

| Layer | Tecnologia | Ruolo |
| :--- | :--- | :--- |
| **Frontend** | Cloudflare Pages (React/Vite + TypeScript + TailwindCSS) | Sito vetrina pubblico |
| **Backend** | Cloudflare Workers (API serverless) | Form contatti, mini-gestionale, logica business |
| **Database** | Cloudflare D1 (SQLite serverless) | Archiviazione offerte e configurazioni |
| **Storage** | Cloudflare R2 | Immagini, video, locandine PDF |
| **CDN/DNS** | Cloudflare (già attivo) | Distribuzione globale, SSL, protezione DDoS |
| **Repository** | GitHub (privato) | Versionamento codice |
| **Deploy** | GitHub App → Cloudflare (automatico) | CI/CD senza intervento manuale |

### 6.2 Workflow di Deploy (Regola d'Oro)

> **Regola Fondamentale**: MAI eseguire deploy manuali. Il deploy avviene esclusivamente tramite push su GitHub.

Il flusso di lavoro completo è il seguente:

1.  `git clone <repository>` — Clona il repository in locale.
2.  Sviluppo e modifica del codice in locale.
3.  `git add . && git commit -m "descrizione"` — Commit delle modifiche.
4.  `git push origin main` — Push sul branch principale.
5.  **Cloudflare rileva automaticamente il push** (tramite GitHub App) e avvia 2 deploy in parallelo:
    *   Deploy **Frontend** su Cloudflare Pages (~3 minuti).
    *   Deploy **Backend** su Cloudflare Worker (~3 minuti).

**Divieto assoluto**: NON utilizzare GitHub Actions Workflows per il deploy. La sincronizzazione è gestita nativamente dall'integrazione GitHub App di Cloudflare. I token API di GitHub vengono utilizzati esclusivamente per il push del codice.

### 6.3 Schema Architetturale

```
GitHub Repository (main branch)
        │
        │  push
        ▼
GitHub App (Cloudflare Integration)
        │
        ├──────────────────────────────────┐
        │                                  │
        ▼                                  ▼
Cloudflare Pages                  Cloudflare Workers
(Frontend React/Vite)             (API serverless)
        │                                  │
        │                                  ├── Cloudflare D1 (Database)
        │                                  └── Cloudflare R2 (Storage)
        │
        └── mondoisole.net (DNS Cloudflare)
```

---

## 7. Requisiti Funzionali — Frontend (Sito Vetrina)

### 7.1 Principi di UX/UI
Il riferimento di ispirazione per l'intuitività è **Booking.com**: a colpo d'occhio, senza leggere nulla, l'utente deve capire cosa vende il sito. La UX deve essere lineare, senza passaggi superflui.

### 7.2 Struttura delle Pagine

#### Home Page
*   **Hero Section**: Titolo chiaro e diretto (es. "Vacanze in Croazia e Sicilia da Catania"), sottotitolo, immagine/video di impatto.
*   **Sezione Destinazioni**: Card cliccabili per Croazia, Sicilia, Albania (con immagini evocative).
*   **Offerte in Evidenza**: Griglia di card delle ultime offerte caricate (massimo 6-8 in home).
*   **CTA Principale**: Pulsante WhatsApp e/o form di contatto rapido sempre visibile.
*   **Social Proof**: Breve sezione "Chi siamo" con anni di esperienza e numero di clienti serviti.

#### Pagina Destinazione (es. /croazia)
*   Descrizione della destinazione con tono ispirazionale.
*   Elenco dei pacchetti disponibili per quella destinazione.
*   Filtri semplici (es. per data, per budget).

#### Pagina Dettaglio Pacchetto
*   Galleria fotografica (immagini di alta qualità caricate su R2).
*   Titolo del pacchetto, stelle hotel, location.
*   Descrizione completa dei servizi inclusi (volo, hotel, transfer, trattamento).
*   Date disponibili (inserite manualmente nel gestionale).
*   Prezzo di partenza (es. "da €770 p.p. in doppia").
*   **CTA Primaria**: Pulsante "Prenota via WhatsApp" (link diretto al numero aziendale con messaggio pre-compilato).
*   **CTA Secondaria**: Form di richiesta informazioni (nome, email, telefono, messaggio).

#### Pagina Chi Siamo
*   Storia dell'azienda e valori.
*   Punti di forza (esperienza, localizzazione, assistenza 24h).
*   Contatti completi (sede Catania, telefono, email, WhatsApp).

#### Pagina Contatti
*   Form di contatto generico.
*   Mappa sede Catania.
*   Link social media.

### 7.3 Elementi Trasversali
*   **Header**: Logo cliccabile (rimanda alla home), navigazione principale, numero di telefono e pulsante WhatsApp sempre visibili.
*   **Footer**: Link alle pagine principali, condizioni generali di vendita, condizioni particolari, P.IVA, link social.
*   **WhatsApp Widget**: Pulsante fluttuante WhatsApp sempre presente in tutte le pagine.
*   **Cookie Banner**: Conforme GDPR.

---

## 8. Requisiti Funzionali — Backend (Mini-Gestionale)

### 8.1 Obiettivo
Il team (social media manager e booking) deve poter aggiornare le offerte in totale autonomia, senza dipendere dallo sviluppatore, con una cadenza settimanale. Il pannello deve essere estremamente semplice, simile all'inserimento di un articolo di blog.

### 8.2 Funzionalità del Pannello Operatore

| Funzione | Descrizione |
| :--- | :--- |
| **Login Sicuro** | Accesso tramite email + password (solo per il team interno) |
| **Gestione Offerte** | Crea, modifica, pubblica, archivia un'offerta |
| **Upload Immagini** | Upload diretto su Cloudflare R2 dal pannello |
| **Gestione Destinazioni** | Attiva/disattiva le destinazioni visibili sul sito |
| **Visualizzazione Richieste** | Elenco delle richieste di informazioni ricevute via form |

### 8.3 Campi per la Creazione di un'Offerta

*   **Titolo** (es. "Hotel Biokovo 4★ — Makarska")
*   **Destinazione** (select: Croazia / Sicilia / Albania)
*   **Immagine di Copertina** (upload su R2)
*   **Galleria Immagini** (upload multiplo su R2)
*   **Descrizione Breve** (per le card in home)
*   **Descrizione Completa** (per la pagina dettaglio)
*   **Prezzo di Partenza** (es. 770)
*   **Tipologia Prezzo** (es. "p.p. in doppia BB")
*   **Date Disponibili** (testo libero, es. "Luglio e Agosto 2026")
*   **Servizi Inclusi** (checklist: Volo, Hotel, Transfer, Colazione, Mezza Pensione, Pensione Completa)
*   **Stelle Hotel** (1-5)
*   **Stato** (Bozza / Pubblicata / Archiviata)
*   **In Evidenza** (flag per mostrare in home page)

---

## 9. Standard di Sviluppo: Sicurezza e Responsive Design

### 9.1 Sicurezza (OWASP Top 10)
Tutto il codice, in particolare i Cloudflare Workers che gestiscono i form e il pannello operatore, deve essere sviluppato tenendo conto delle principali vulnerabilità OWASP.

| Rischio OWASP | Misura Implementativa |
| :--- | :--- |
| **Injection (SQL/XSS)** | Sanitizzazione e validazione di tutti gli input lato server; uso di query parametrizzate con D1 |
| **Broken Authentication** | Autenticazione robusta per il pannello operatore; sessioni con scadenza; password hashing (bcrypt) |
| **Sensitive Data Exposure** | HTTPS obbligatorio (gestito da Cloudflare); nessuna credenziale nel codice sorgente |
| **CSRF** | Token CSRF su tutti i form POST |
| **Security Misconfiguration** | Headers di sicurezza HTTP (CSP, HSTS, X-Frame-Options) configurati a livello Cloudflare |
| **Rate Limiting** | Rate limiting sui form di contatto e sull'endpoint di login tramite Cloudflare Rules |

### 9.2 Responsive Design (Mobile-First)
Il sito deve essere progettato prima per mobile e poi scalato per desktop, dato che la maggior parte del traffico proverrà dai social (Instagram/TikTok).

*   **Vietato** l'uso di dimensioni fisse in pixel (`px`) per layout, tipografia e spaziature.
*   **Obbligatorio** l'uso di unità relative:
    *   `rem` per dimensioni del testo e spaziature (padding, margin).
    *   `%`, `vw` (viewport width), `vh` (viewport height) per la struttura dei layout.
    *   `clamp()` per la tipografia fluida (es. `font-size: clamp(1rem, 2.5vw, 1.5rem)`).
*   **Breakpoint standard**: Mobile (<768px), Tablet (768px–1024px), Desktop (>1024px).
*   **Test obbligatorio** su Chrome DevTools per i principali dispositivi mobile (iPhone 14, Samsung Galaxy S23).

---

## 10. Strategia Social e Content Marketing

### 10.1 Canali Social
*   **Instagram**: Canale principale per la scoperta visiva delle destinazioni. Reel e Stories.
*   **TikTok**: Canale per raggiungere un pubblico più giovane e per la viralità organica.
*   **Facebook**: Canale di supporto, utile per raggiungere un pubblico più maturo (famiglie).

### 10.2 Ruolo della Social Media Manager
La social media manager (figura già individuata) avrà un duplice ruolo:
1.  **Selezione e pubblicazione delle offerte**: Ogni settimana seleziona le offerte più interessanti e le carica sul sito tramite il mini-gestionale.
2.  **Creazione dei contenuti social**: Produce video "face-to-camera" (in cui appare come "frontgirl" del brand), reel sulle destinazioni e locandine grafiche.

### 10.3 Formato dei Contenuti
*   **Video face-to-camera**: Il formato più efficace per costruire fiducia e connessione con il pubblico. La social media manager parla direttamente all'utente presentando le offerte.
*   **Locandine grafiche**: Utili per comunicare prezzi e date in modo immediato. Da usare in combinazione con i video, non come unico formato.
*   **Reel/TikTok di destinazione**: Video emozionali delle destinazioni (Makarska, Korčula, Taormina) per ispirare il viaggio.

### 10.4 Campagne ADV a Pagamento
Le campagne pubblicitarie a pagamento (Meta Ads su Instagram/Facebook, TikTok Ads) sono **obbligatorie** e devono essere avviate subito dopo Pasqua. Con soli 44 follower su Instagram, la crescita organica è troppo lenta per generare traffico significativo in tempo per la stagione estiva.

*   **Obiettivo campagne**: Traffico verso il sito vetrina + Lead generation (richieste di informazioni).
*   **Target geografico**: Catania, Sicilia Orientale (in prima fase).
*   **Budget**: Da definire con il management, ma considerato obbligatorio per il lancio.

---

## 11. Analisi SWOT Aggiornata

| | **Positivo** | **Negativo** |
| :--- | :--- | :--- |
| **Interno** | **Strengths**: 20 anni di esperienza; rete agenziale consolidata; know-how su Croazia; partenza da Catania (mercato captive); brand già conosciuto nel settore. | **Weaknesses**: Presenza social quasi nulla (44 follower IG); sito web obsoleto e non aggiornato; dipendenza dalla stagionalità estiva; nessun volo charter proprio nel 2026. |
| **Esterno** | **Opportunities**: Crescita del turismo in Croazia; domanda di turismo di prossimità in Sicilia; potenziale virale dei contenuti social sulle destinazioni balcaniche; possibile sviluppo B2B post-stagione. | **Threats**: Forte concorrenza delle OTA (Booking, Expedia, Lastminute); instabilità dei costi dei voli di linea; percezione negativa dell'Albania come destinazione (rapporto qualità/prezzo); stagione estiva breve (3 mesi). |

---

## 12. Roadmap Operativa

### Fase 1 — Setup e Infrastruttura (Settimana 1)
*   Recupero accessi al dominio `mondoisole.net` (contattare Angelo Lo Bianco per verificare il registrar, probabilmente Aruba/Registrar.it).
*   Creazione repository GitHub privato.
*   Setup Cloudflare Pages + Workers + D1 + R2.
*   Collegamento GitHub App → Cloudflare per il deploy automatico.
*   Verifica e aggiornamento dei dati strutturati (correggere il nome Organization da "Alba Holidays" a "Mondoisole").

### Fase 2 — Sviluppo MVP Frontend (Settimana 2-3)
*   Sviluppo layout Home Page (Mobile-First, React/Vite + TailwindCSS).
*   Sviluppo pagine Destinazione e Dettaglio Pacchetto.
*   Sviluppo pagine Chi Siamo e Contatti.
*   Integrazione pulsante WhatsApp fluttuante.
*   Sviluppo form di contatto con API Worker (con protezione CSRF e rate limiting).

### Fase 3 — Sviluppo Mini-Gestionale (Settimana 3-4)
*   Sviluppo pannello operatore (login, CRUD offerte, upload immagini su R2).
*   Setup database D1 con schema per offerte e richieste.
*   Test completo del flusso: login → creazione offerta → pubblicazione → visualizzazione sul sito.

### Fase 4 — Content, Launch e ADV (Settimana 4-5)
*   Caricamento delle prime offerte (Croazia e Sicilia) tramite il gestionale.
*   Go-live del nuovo sito su `mondoisole.net`.
*   Avvio strategia social (video reel/TikTok) da parte della social media manager.
*   Lancio campagne ADV a pagamento su Meta (Instagram/Facebook).

### Fase 5 — Ottimizzazione Post-Lancio (Mese 2)
*   Monitoraggio Analytics (GA4) e ottimizzazione delle campagne ADV.
*   A/B test sulle CTA (WhatsApp vs. form di contatto).
*   Valutazione dell'aggiunta di TikTok Ads.
*   Pianificazione della fase B2B per il post-stagione.

---

## 13. Riferimenti Tecnici e Accessi

### 13.1 Accessi da Recuperare
*   **Dominio `mondoisole.net`**: Verificare con Angelo Lo Bianco il registrar (probabilmente Aruba o Registrar.it). Necessari i dati di accesso per puntare i nameserver a Cloudflare.
*   **Account Cloudflare**: Verificare se esiste già un account Cloudflare attivo per il dominio o se crearne uno nuovo.
*   **Google Analytics**: Account GA4 con ID `G-72HMT5X1EE` (da verificare l'accesso).

### 13.2 Contatti Operativi Mondoisole
*   **Sede**: Via Gambino 15 – 95131 Catania (CT)
*   **Telefono**: +39 095 88 38 995
*   **Mobile (WhatsApp)**: +39 348 178 2499
*   **Email Booking**: booking@mondoisole.net
*   **P.IVA**: 01835190891

### 13.3 Comandi Rapidi Cloudflare/GitHub
```bash
# Clone del repository
git clone https://github.com/<org>/mondoisole-2026.git

# Sviluppo locale con Wrangler (Cloudflare CLI)
npx wrangler dev

# Push per deploy automatico
git add .
git commit -m "feat: aggiunta offerta Croazia luglio"
git push origin main

# Upload file su R2 (se necessario da CLI)
npx wrangler r2 object put mondoisole-assets/immagini/hotel-biokovo.jpg --file ./hotel-biokovo.jpg
```

---

*Documento redatto da **Manus AI** — Versione 1.0 — 10 Aprile 2026*
*Fonti: Analisi tecnica di mondoisole.net + Trascrizione call stakeholder del 02/04/2026*

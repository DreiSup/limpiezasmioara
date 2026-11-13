// English copy. Source: copy/en.md. Same layout as the Spanish page.
import type { Dict } from './es';

export const en: Dict = {
  lang: 'en',
  path: '/en/',
  ogLocale: 'en_GB',
  ogLocaleAlternate: 'es_ES',
  seo: {
    title: 'Holiday Rental Cleaning in Cullera, la Ribera & Valencia | Limpiezas Mioara',
    description:
      "Turnover cleaning for your Airbnb or Booking apartment: fresh linen, restocking and photos when I'm done. Cullera, Sueca, la Ribera and south Valencia. Message me on WhatsApp.",
  },
  whatsappMessage:
    "Hi Mioara, I found your website. I have a holiday rental in ___ and I'm interested in turnover cleaning.",
  skipLink: 'Skip to content',
  langNavLabel: 'Language',
  cta: 'Message me on WhatsApp',
  ids: {
    services: 'services',
    steps: 'how-it-works',
    guarantee: 'guarantee',
    about: 'about',
    zones: 'areas',
    faq: 'faq',
    contact: 'contact',
  },
  hero: {
    h1Before: 'Holiday rental cleaning in ',
    h1Mark: 'Cullera, la Ribera and Valencia',
    lead: "I get your apartment ready for the next guest and send you photos on WhatsApp when I'm done.",
    leadWavy: 'No need for you to be there.',
    note: "You'll talk to me directly, Mioara. No commitment. Limited spots.",
    photo: {
      label: 'Photo placeholder: made bed with folded towels',
      title: 'PHOTO · Made bed + towels',
      spec: '4:3 · 1200×900 (2400×1800 @2x) · natural light, close-up',
    },
  },
  services: {
    h2: 'What every clean includes',
    note: 'Note: you can supply the cleaning products, or I can bring them for a small extra fee.',
    items: [
      { title: 'Full clean:', text: 'kitchen, bathrooms, bedrooms and living areas.' },
      { title: 'Bed linen and towels:', text: 'changed, with beds made.' },
      { title: 'Restocking:', text: 'toilet paper, soap, coffee… whatever you provide for your guests.' },
      { title: 'Check-up:', text: "I'll let you know about any damage or items left behind." },
      { title: "Photos when I'm done:", text: 'sent on WhatsApp so you can see the result.' },
      { title: 'Deep cleans:', text: 'before or after the season, or when moving.' },
    ],
  },
  steps: {
    h2: 'How it works',
    items: [
      {
        title: 'Message me on WhatsApp.',
        text: 'Tell me where the apartment is, how many bedrooms it has and how often guests check out.',
      },
      { title: "I'll send you a price and my availability.", text: 'No surprises.' },
      { title: 'I clean after every check-out.', text: 'You handle access (key box or smart lock).' },
      { title: "I send you photos when I'm done.", text: "And I'll flag anything that needs your attention." },
    ],
  },
  guarantee: {
    h2Before: "If something isn't right, I'll redo it ",
    h2Circled: 'for free',
    text: "Your reviews depend on cleanliness. If you or your guest spot anything that isn't right, I'll come back and fix it at no cost.",
  },
  about: {
    h2Before: "Hi, I'm ",
    h2Name: 'Mioara',
    p1Before:
      "I've been working in cleaning for over 10 years, all of them on a permanent contract with the same company, cleaning both offices and a private home. That means",
    p1Mark: "I'm reliable and people trust me.",
    p2: 'I live in la Ribera and know the area well. I treat your apartment like my own home: clean, checked and ready for a 5-star review.',
    photo: {
      label: 'Photo placeholder: portrait of Mioara',
      title: 'PORTRAIT · Mioara',
      spec: '4:5 · 1080×1350 · natural smile, at home, window light',
    },
  },
  zones: {
    h2: 'Where I work',
    items: [
      { name: 'Coast:', places: 'Cullera, El Perelló, El Palmar, El Saler.' },
      { name: 'La Ribera:', places: 'Sueca, Alzira, Algemesí, Almussafes, Benifaió, Sollana, Alginet.' },
      { name: 'Horta Sud:', places: 'Silla, Catarroja, Albal, Alfafar, Picassent, Torrent.' },
      { name: 'Valencia:', places: 'southern neighbourhoods.' },
    ],
    noteQuestion: "Don't see your town?",
    noteLink: "Message me and we'll work it out.",
  },
  faq: {
    h2: 'Frequently asked questions',
    items: [
      {
        q: 'How much does it cost?',
        a: 'It depends on the size of the apartment and how often you have check-outs. Message me on WhatsApp for a free quote.',
      },
      {
        q: 'Do you collect or hand over keys?',
        a: 'No. A key box or smart lock works best, so I can get in as soon as the guest leaves.',
      },
      { q: 'Who supplies the cleaning products?', a: 'You can, or I can bring them for a small extra fee.' },
      {
        q: 'When are you available?',
        a: "Tell me your check-out and check-in times and we'll work it out. I group cleans by area so I'm always on time.",
      },
      {
        q: "How do I know it's been done properly?",
        a: "I send you photos on WhatsApp when I'm done. And if anything isn't right, I'll redo it for free.",
      },
      { q: 'Do you do deep cleans?', a: 'Yes: at the start or end of the season, and for move-ins or move-outs.' },
    ],
  },
  contact: {
    h2: "Let's talk",
    text: "I work with only a few apartments so I can look after each one properly, so spots are limited. Tell me where your apartment is and I'll send you a price and my availability.",
  },
  footer: {
    businessName: 'Limpiezas Mioara',
    legalNavLabel: 'Legal',
    // TODO(legal): pages not created yet (pending legal owner: name and NIF).
    legal: [
      { href: '/en/legal-notice/', label: 'Legal notice' },
      { href: '/en/privacy/', label: 'Privacy policy' },
    ],
  },
  schema: {
    businessDescription:
      'Turnover cleaning for holiday rentals (Airbnb, Booking) in Cullera, El Perelló, la Ribera, Horta Sud and south Valencia.',
    jobTitle: 'Holiday rental cleaning',
    services: [
      {
        name: 'Turnover cleaning',
        serviceType: 'Holiday rental cleaning',
        description:
          'Full clean, bed linen and towels changed, restocking, check for damage and items left behind, and photos on WhatsApp when done.',
      },
      {
        name: 'Deep clean',
        serviceType: 'Home deep cleaning',
        description: 'Before or after the season, or when moving.',
      },
    ],
  },
};

/*
 * DESIGN SYSTEM: Warm Editorial Craft
 * Language context for EN/NL bilingual support
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'en' | 'nl';

const STORAGE_KEY = 'lang';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'nl') return stored;
  } catch {
    /* ignore */
  }
  // Detect Dutch from browser, otherwise English
  const navLang = window.navigator?.language?.toLowerCase() ?? '';
  if (navLang.startsWith('nl')) return 'nl';
  return 'en';
}

interface Translations {
  nav: {
    home: string;
    about: string;
    portfolio: string;
    process: string;
    contact: string;
    cv: string;
    available: string;
    language_label: string;
  };
  hero: {
    name: string;
    title: string;
    subtitle: string;
    cta_portfolio: string;
    cta_contact: string;
    available_from: string;
    scroll: string;
  };
  about: {
    heading: string;
    heading_line1: string;
    heading_line2: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
    stats: { value: string; label: string }[];
  };
  portfolio: {
    heading: string;
    subheading: string;
    view_full: string;
    pause: string;
    play: string;
    photos: string;
    all_work: string;
    categories: Record<string, string>;
  };
  process: {
    heading: string;
    subheading: string;
    caption: string;
    quote: string;
    steps: { number: string; title: string; description: string }[];
  };
  skills: {
    heading: string;
    items: string[];
  };
  contact: {
    heading: string;
    heading_line1: string;
    heading_line2: string;
    subheading: string;
    location: string;
    available_from: string;
    email_label: string;
    phone_label: string;
    phone_note: string;
    whatsapp_label: string;
    whatsapp_note: string;
    linkedin_label: string;
    download_cv: string;
    download_cover: string;
    form_heading: string;
    form_name: string;
    form_email: string;
    form_subject: string;
    form_subject_placeholder: string;
    form_message: string;
    form_send: string;
    form_sending: string;
    form_success: string;
    form_error: string;
  };
  footer: {
    text: string;
    tagline: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      process: 'Process',
      contact: 'Contact',
      cv: 'Download CV',
      available: 'Available for hire',
      language_label: 'Language:',
    },
    hero: {
      name: 'Alexandru Burtea',
      title: 'Furniture Designer & Craftsman',
      subtitle: '10+ years of custom furniture craftsmanship. Precision, quality, and design — built to last.',
      cta_portfolio: 'View My Work',
      cta_contact: 'Get in Touch',
      available_from: 'Available from 31 August 2026',
      scroll: 'Scroll',
    },
    about: {
      heading: 'About Me',
      heading_line1: 'Designed with purpose',
      heading_line2: 'Crafted to last.',
      p1: 'My name is Alexandru Burtea, a furniture designer and craftsman with more than a decade of experience in custom furniture production. I work on a project basis, designing and manufacturing high-quality custom furniture, including kitchens, living rooms, bedrooms, bathrooms, dressing rooms, hallways, and office furniture for both residential and commercial spaces.',
      p2: 'I mainly undertake turnkey projects — planning, design, production, and installation — tailored to each client\'s needs.',
      p3: 'To ensure transparency and build trust, I provide a detailed 3D design so clients can visualize their project before giving their approval for production.',
      p4: 'I have crafted furniture for private clients and companies in England, the Netherlands, Germany, and Romania.',
      p5: 'Having successfully completed several long-term projects, I am now available to take on new projects, preferably in the Netherlands, where I continue to have ongoing projects.',
      stats: [
        { value: '10+', label: 'Years of Experience' },
        { value: '4', label: 'Years as Entrepreneur' },
        { value: '7', label: 'Furniture Categories' },
        { value: '100%', label: 'Custom Made' },
      ],
    },
    portfolio: {
      heading: 'Portfolio',
      subheading: 'A selection of recent custom furniture projects.',
      view_full: 'Click to view full size',
      pause: 'Pause slideshow',
      play: 'Resume slideshow',
      photos: 'photos',
      all_work: 'All work',
      categories: {
        all: 'All',
        kitchen: 'Kitchens',
        living_room: 'Living Rooms',
        bedroom_wardrobe: 'Bedrooms & Wardrobes',
        hallway: 'Hallways',
        dressing_room: 'Dressing Rooms',
        bathroom: 'Bathrooms',
        office_reception: 'Offices & Receptions',
      },
    },
    process: {
      heading: 'My Process',
      subheading: 'From concept to completion — every project follows a clear, client-focused workflow.',
      caption: 'From workshop to home — every piece, hand-finished',
      quote: 'Detailed 3D design using the selected materials and finishes, so you can see the final result before production and give your approval.',
      steps: [
        {
          number: '01',
          title: 'Consultation',
          description: 'We discuss your needs, space dimensions, style preferences, and budget. Every project starts with listening.',
        },
        {
          number: '02',
          title: '3D Design',
          description: 'Creating a detailed 3D model using the actual materials and finishes selected for your project, so you can visualize the final result before production begins.',
        },
        {
          number: '03',
          title: 'Production',
          description: 'All furniture is crafted in my workshop using professional woodworking machinery and hand tools. Working with MDF, laminated boards, plywood, and solid wood.',
        },
        {
          number: '04',
          title: 'Installation',
          description: 'On-site assembly and installation with precision, ensuring everything fits perfectly and meets the highest quality standards.',
        },
      ],
    },
    skills: {
      heading: 'Skills & Expertise',
      items: [
        'Custom cabinet making & furniture production',
        'Kitchen and wardrobe design & assembly',
        '3D design',
        'Reading and working from technical drawings',
        'MDF, laminated boards, plywood & solid wood',
        'Professional woodworking machines & hand tools',
        'On-site measurement, fitting & installation',
        'Project management & client communication',
      ],
    },
    contact: {
      heading: 'Contact',
      heading_line1: 'Let\'s work',
      heading_line2: 'together.',
      subheading: 'Available for relocation to the Netherlands. Open to full-time employment in a professional workshop.',
      location: 'Currently based in Germany — Willing to relocate to the Netherlands',
      available_from: 'Available from 31 August 2026',
      email_label: 'Email',
      phone_label: 'Phone',
      phone_note: 'Call or message me anytime',
      whatsapp_label: 'WhatsApp',
      whatsapp_note: 'Message or call me anytime',
      linkedin_label: 'LinkedIn',
      download_cv: 'Download CV',
      download_cover: 'Download Cover Letter',
      form_heading: 'Or send a message',
      form_name: 'Your name',
      form_email: 'Email address',
      form_subject: 'Subject',
      form_subject_placeholder: 'Project enquiry, job opportunity…',
      form_message: 'Message',
      form_send: 'Send message',
      form_sending: 'Sending…',
      form_success: 'Thank you — I’ll get back to you within 24 hours.',
      form_error: 'Something went wrong. Please email me directly at info@alexandruburtea.nl.',
    },
    footer: {
      text: '© 2025 Alexandru Burtea. All rights reserved.',
      tagline: 'Custom Furniture Designer & Craftsman',
    },
  },
  nl: {
    nav: {
      home: 'Home',
      about: 'Over mij',
      portfolio: 'Portfolio',
      process: 'Werkwijze',
      contact: 'Contact',
      cv: 'CV downloaden',
      available: 'Beschikbaar voor werk',
      language_label: 'Taal:',
    },
    hero: {
      name: 'Alexandru Burtea',
      title: 'Meubelontwerper & Vakman',
      subtitle: '10+ jaar ervaring in maatwerk meubilair. Precisie, kwaliteit en design — gemaakt om lang mee te gaan.',
      cta_portfolio: 'Bekijk mijn werk',
      cta_contact: 'Neem contact op',
      available_from: 'Beschikbaar vanaf 31 augustus 2026',
      scroll: 'Scroll',
    },
    about: {
      heading: 'Over mij',
      heading_line1: 'Ontworpen met een doel.',
      heading_line2: 'Vakwerk dat blijft.',
      p1: 'Mijn naam is Alexandru Burtea, meubelmaker en ontwerper met meer dan tien jaar ervaring in de productie van maatwerk meubelen. Ik werk op projectbasis en ontwerp en produceer hoogwaardig maatwerk, waaronder keukens, woonkamers, slaapkamers, badkamers, kleedkamers, gangen en kantoormeubilair voor zowel woon- als bedrijfsruimtes.',
      p2: 'Ik neem voornamelijk turnkey projecten aan — planning, ontwerp, productie en montage — afgestemd op elke klant.',
      p3: 'Om transparantie te garanderen en vertrouwen op te bouwen, lever ik een gedetailleerd 3D-ontwerp zodat klanten hun project kunnen visualiseren voordat zij hun goedkeuring geven voor de productie.',
      p4: 'Ik heb meubilair vervaardigd voor particulieren en bedrijven in Engeland, Nederland, Duitsland en Roemenië.',
      p5: 'Na meerdere langlopende projecten succesvol te hebben afgerond, ben ik nu beschikbaar voor nieuwe projecten, bij voorkeur in Nederland, waar ik nog steeds lopende projecten heb.',
      stats: [
        { value: '10+', label: 'Jaar ervaring' },
        { value: '4', label: 'Jaar als ondernemer' },
        { value: '7', label: 'Meubelcategorieën' },
        { value: '100%', label: 'Op maat gemaakt' },
      ],
    },
    portfolio: {
      heading: 'Portfolio',
      subheading: 'Een selectie van recente maatwerk meubelprojecten.',
      view_full: 'Klik voor volledige weergave',
      pause: 'Diavoorstelling pauzeren',
      play: 'Diavoorstelling hervatten',
      photos: 'foto\'s',
      all_work: 'Alle projecten',
      categories: {
        all: 'Alles',
        kitchen: 'Keukens',
        living_room: 'Woonkamers',
        bedroom_wardrobe: 'Slaapkamers & Kasten',
        hallway: 'Gangen',
        dressing_room: 'Kleedkamers',
        bathroom: 'Badkamers',
        office_reception: 'Kantoren & Recepties',
      },
    },
    process: {
      heading: 'Werkwijze',
      subheading: 'Van concept tot oplevering — elk project volgt een duidelijk, klantgericht proces.',
      caption: 'Van werkplaats tot woning — elk stuk met de hand afgewerkt',
      quote: 'Gedetailleerd 3D-ontwerp met de gekozen materialen en afwerkingen — zo ziet u het eindresultaat vóór productie en geeft u akkoord.',
      steps: [
        {
          number: '01',
          title: 'Overleg',
          description: 'We bespreken uw wensen, ruimteafmetingen, stijlvoorkeuren en budget. Elk project begint met luisteren.',
        },
        {
          number: '02',
          title: '3D-ontwerp',
          description: 'Een gedetailleerd 3D-model op basis van de werkelijke materialen en afwerkingen voor uw project, zodat u het eindresultaat kunt visualiseren voordat de productie begint.',
        },
        {
          number: '03',
          title: 'Productie',
          description: 'Alle meubels worden vervaardigd in mijn werkplaats met professionele houtbewerkingsmachines en handgereedschap. Gewerkt met MDF, gelamineerde platen, multiplex en massief hout.',
        },
        {
          number: '04',
          title: 'Montage',
          description: 'Montage op locatie met precisie, zodat alles perfect past en voldoet aan de hoogste kwaliteitsnormen.',
        },
      ],
    },
    skills: {
      heading: 'Vaardigheden & Expertise',
      items: [
        'Maatwerk meubelen & interieurbouw',
        'Keuken- en kastontwerp & montage',
        '3D-ontwerp',
        'Lezen en werken vanuit technische tekeningen',
        'Plaatmateriaal (MDF, multiplex, gelamineerd) & massief hout',
        'Professionele houtbewerkingsmachines & handgereedschap',
        'Opmeten op locatie, passen en montage',
        'Projectbeheer & klantcommunicatie',
      ],
    },
    contact: {
      heading: 'Contact',
      heading_line1: 'Laten we',
      heading_line2: 'samenwerken.',
      subheading: 'Beschikbaar voor verhuizing naar Nederland. Open voor een vaste baan in een professionele werkplaats.',
      location: 'Momenteel gevestigd in Duitsland — Bereid te verhuizen naar Nederland',
      available_from: 'Beschikbaar vanaf 31 augustus 2026',
      email_label: 'E-mail',
      phone_label: 'Telefoon',
      phone_note: 'Bel of stuur een bericht — altijd welkom',
      whatsapp_label: 'WhatsApp',
      whatsapp_note: 'Bericht of bel — altijd welkom',
      linkedin_label: 'LinkedIn',
      download_cv: 'CV downloaden',
      download_cover: 'Motivatiebrief downloaden',
      form_heading: 'Of stuur een bericht',
      form_name: 'Uw naam',
      form_email: 'E-mailadres',
      form_subject: 'Onderwerp',
      form_subject_placeholder: 'Projectaanvraag, vacature…',
      form_message: 'Bericht',
      form_send: 'Bericht versturen',
      form_sending: 'Versturen…',
      form_success: 'Bedankt — ik neem binnen 24 uur contact met u op.',
      form_error: 'Er ging iets mis. Stuur me direct een e-mail op info@alexandruburtea.nl.',
    },
    footer: {
      text: '© 2025 Alexandru Burtea. Alle rechten voorbehouden.',
      tagline: 'Meubelmaker & maatwerk interieurbouw',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => getInitialLanguage());
  const t = translations[language];

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  };

  // Keep <html lang> in sync for accessibility & SEO
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

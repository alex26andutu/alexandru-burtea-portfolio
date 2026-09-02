/*
 * DESIGN SYSTEM: Warm Editorial Craft
 * Language context for EN/NL bilingual support
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'en' | 'nl';

const STORAGE_KEY = 'lang';

// Dutch is the default: the site targets employers in the Netherlands, so
// first-time visitors (and the prerendered HTML crawlers see) get NL.
// A visitor's explicit choice is remembered and always wins.
const DEFAULT_LANGUAGE: Language = 'nl';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'nl') return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANGUAGE;
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
    /** Alt for the hero photo. Describes what is pictured only — no material
     *  or construction claims. */
    photo_alt: string;
  };
  about: {
    heading: string;
    /** Alt text for the portrait beside the bio. Describes what is
     *  pictured only — no material or construction claims. */
    workshop_alt: string;
    heading_line1: string;
    heading_line2: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
    /** A stat value may contain {categories}; AboutSection fills it from the
     *  gallery so the figure cannot drift from the actual work. */
    stats: { value: string; label: string }[];
  };
  portfolio: {
    heading: string;
    subheading: string;
    photos: string;
    view_all: string;
    /** Link back from an opened category to the six cards. */
    all_categories: string;
    /** Reveals the rest of a category past the initial batch. */
    show_more: string;
    categories: Record<string, string>;
    /** One line per category, shown on its card. Owner to refine. */
    category_blurb: Record<string, string>;
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
    /** Contains the literal {year}; Footer.tsx swaps in the current year. */
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
      title: 'Custom Furniture Maker',
      subtitle: '10+ years of custom furniture craftsmanship. Precision, quality, and design — built to last.',
      cta_portfolio: 'View My Work',
      cta_contact: 'Get in Touch',
      available_from: 'Available from 30 September 2026',
      scroll: 'Scroll',
      photo_alt: 'Dining area with a slatted room divider and built-in display niches',
    },
    about: {
      heading: 'About Me',
      workshop_alt: 'Alexandru Burtea in his workshop',
      heading_line1: 'Designed with purpose',
      heading_line2: 'Crafted to last.',
      p1: 'My name is Alexandru Burtea, a furniture maker and cabinet maker with over ten years of experience in custom furniture and kitchens, built up across Romania, England and Germany.',
      p2: 'I work the full process: client brief, design in SketchUp, production drawings, workshop production and on-site installation. Sawing, edge-banding, veneering, finishing and measuring on site — I know every step, because I have done all of them myself.',
      p3: 'I started in a workshop in Romania, spent three years in furniture and joinery in England, then ran my own interior fit-out business, and most recently worked as a kitchen installer for XXXLutz in Germany. Working to tight installation plans and Western European quality standards is everyday practice for me.',
      p4: 'I have built furniture for private clients and companies in England, the Netherlands, Germany and Romania.',
      p5: 'I am now looking for a permanent position in a professional workshop, where craftsmanship counts and where I can put both my workshop and installation experience to use.',
      stats: [
        { value: '10+', label: 'Years of Experience' },
        { value: '4', label: 'Years running own workshop' },
        { value: '{categories}', label: 'Furniture Categories' },
        { value: '100%', label: 'Custom Made' },
      ],
    },
    portfolio: {
      heading: 'Portfolio',
      subheading: 'A selection of recent custom furniture projects.',
      photos: 'photos',
      view_all: 'View all',
      all_categories: 'All categories',
      show_more: 'Show more',
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
      category_blurb: {
        kitchen: 'Full kitchen installations — islands, tall appliance runs, handleless and fluted fronts.',
        living_room: 'Media walls, floating units, sideboards and built-in shelving.',
        bedroom_wardrobe: 'Walk-in wardrobes, fitted cupboards, dressing tables and glazed-door units.',
        hallway: 'Entrance units, coat storage and full-height hallway cabinetry.',
        bathroom: 'Vanity units and bathroom storage, including fitted drawer interiors.',
        office_reception: 'Reception desks, office storage walls and commercial fit-outs.',
      },
    },
    process: {
      heading: 'My Process',
      subheading: 'From brief to installed — how I take a project through.',
      caption: 'From workshop to installation',
      quote: 'I know every step, because I have done all of them myself.',
      steps: [
        {
          number: '01',
          title: 'Briefing & site survey',
          description: 'Taking the brief, measuring on site, and settling dimensions, materials and budget before anything is drawn.',
        },
        {
          number: '02',
          title: '3D design',
          description: 'Building a detailed 3D model in SketchUp with the actual materials and finishes, plus production drawings for the workshop.',
        },
        {
          number: '03',
          title: 'Production',
          description: 'Producing in the workshop — panel saw, CNC, edge-bander, spindle moulder. Working in MDF, laminated board, plywood and solid wood.',
        },
        {
          number: '04',
          title: 'Installation',
          description: 'On-site assembly and installation, scribed and fitted so everything lands square and tight.',
        },
      ],
    },
    skills: {
      heading: 'Skills & Expertise',
      items: [
        'Custom cabinet making & furniture production',
        'Kitchen and wardrobe design & assembly',
        'SketchUp Pro — 3D design and production drawings',
        'Reading and working from technical drawings',
        'MDF, laminated boards, plywood & solid wood',
        'Panel saw, CNC, edge-bander, spindle moulder',
        'Veneering, sanding and finishing',
        'On-site measurement, fitting & installation',
        'Project management & client communication',
      ],
    },
    contact: {
      heading: 'Contact',
      heading_line1: 'Let\'s work',
      heading_line2: 'together.',
      subheading: 'Available for relocation to the Netherlands. Open to full-time employment in a professional workshop.',
      location: 'Romanian EU citizen — no work permit required · Willing to relocate to the Netherlands',
      available_from: 'Available from 30 September 2026',
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
      text: '© {year} Alexandru Burtea. All rights reserved.',
      tagline: 'Custom Furniture Maker & Cabinet Maker',
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
      title: 'Meubelmaker & Interieurbouwer',
      subtitle: '10+ jaar ervaring in maatwerk meubilair. Precisie, kwaliteit en design — gemaakt om lang mee te gaan.',
      cta_portfolio: 'Bekijk mijn werk',
      cta_contact: 'Neem contact op',
      available_from: 'Beschikbaar vanaf 30 september 2026',
      scroll: 'Scroll',
      photo_alt: 'Eethoek met een lamellenscheidingswand en ingebouwde nissen',
    },
    about: {
      heading: 'Over mij',
      workshop_alt: 'Alexandru Burtea in zijn werkplaats',
      heading_line1: 'Ontworpen met een doel.',
      heading_line2: 'Vakwerk dat blijft.',
      p1: 'Mijn naam is Alexandru Burtea, meubelmaker en interieurbouwer met ruim tien jaar ervaring in maatwerkmeubels en keukens, opgebouwd in Roemenië, Engeland en Duitsland.',
      p2: 'Ik werk het hele traject: klantgesprek, ontwerp in SketchUp, werktekening, productie in de werkplaats en montage op locatie. Zagen, kantenlijmen, fineren, afwerken en inmeten op locatie — ik ken elke stap, omdat ik ze allemaal zelf heb gedaan.',
      p3: 'Ik begon in de werkplaats in Roemenië, werkte drie jaar in de meubel- en timmerbranche in Engeland, had daarna mijn eigen interieurbouwbedrijf, en werkte als laatste als keukenmonteur bij XXXLutz in Duitsland. Werken volgens strakke montageplannen en West-Europese kwaliteitsnormen is voor mij dagelijkse praktijk.',
      p4: 'Ik heb meubilair gemaakt voor particulieren en bedrijven in Engeland, Nederland, Duitsland en Roemenië.',
      p5: 'Ik zoek nu een vaste plek in een professionele werkplaats, bij een bedrijf waar vakmanschap telt en waar ik mijn ervaring in werkplaats én montage kan inzetten.',
      stats: [
        { value: '10+', label: 'Jaar ervaring' },
        { value: '4', label: 'Jaar eigen werkplaats' },
        { value: '{categories}', label: 'Meubelcategorieën' },
        { value: '100%', label: 'Op maat gemaakt' },
      ],
    },
    portfolio: {
      heading: 'Portfolio',
      subheading: 'Een selectie van recente maatwerk meubelprojecten.',
      photos: 'foto\'s',
      view_all: 'Bekijk alles',
      all_categories: 'Alle categorieën',
      show_more: 'Toon meer',
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
      category_blurb: {
        kitchen: 'Complete keukens — eilanden, hoge apparatenkasten, greeploze en gegroefde fronten.',
        living_room: 'Mediawanden, zwevende kasten, dressoirs en inbouwkasten.',
        bedroom_wardrobe: 'Inloopkasten, kledingkasten op maat, kaptafels en kasten met glasdeuren.',
        hallway: 'Entreemeubels, garderobekasten en gangkasten over de volle hoogte.',
        bathroom: 'Badmeubels en badkamerkasten, inclusief lade-indelingen op maat.',
        office_reception: 'Ontvangstbalies, kantoorkastenwanden en zakelijke inrichting.',
      },
    },
    process: {
      heading: 'Werkwijze',
      subheading: 'Van briefing tot montage — hoe ik een project doorloop.',
      caption: 'Van werkplaats tot montage',
      quote: 'Ik ken elke stap, omdat ik ze allemaal zelf heb gedaan.',
      steps: [
        {
          number: '01',
          title: 'Briefing & opmeten',
          description: 'Briefing opnemen, op locatie opmeten en maten, materialen en budget vaststellen voordat er getekend wordt.',
        },
        {
          number: '02',
          title: '3D-ontwerp',
          description: 'Een gedetailleerd 3D-model opbouwen in SketchUp met de werkelijke materialen en afwerkingen, plus werktekeningen voor de werkplaats.',
        },
        {
          number: '03',
          title: 'Productie',
          description: 'Produceren in de werkplaats — panelzaag, CNC, kantenlijmmachine, freesmachine. Werken in MDF, gelamineerd plaatmateriaal, multiplex en massief hout.',
        },
        {
          number: '04',
          title: 'Montage',
          description: 'Montage en installatie op locatie, ingepast en afgewerkt zodat alles strak en haaks zit.',
        },
      ],
    },
    skills: {
      heading: 'Vaardigheden & Expertise',
      items: [
        'Maatwerk meubelen & interieurbouw',
        'Keuken- en kastontwerp & montage',
        'SketchUp Pro — 3D-ontwerp en werktekeningen',
        'Lezen en werken vanuit technische tekeningen',
        'Plaatmateriaal (MDF, multiplex, gelamineerd) & massief hout',
        'Panelzaag, CNC, kantenlijmmachine, freesmachine',
        'Fineren, schuren en afwerken',
        'Opmeten op locatie, passen en montage',
        'Projectbeheer & klantcommunicatie',
      ],
    },
    contact: {
      heading: 'Contact',
      heading_line1: 'Laten we',
      heading_line2: 'samenwerken.',
      subheading: 'Beschikbaar voor verhuizing naar Nederland. Open voor een vaste baan in een professionele werkplaats.',
      location: 'Roemeense EU-burger — geen werkvergunning nodig · Bereid te verhuizen naar Nederland',
      available_from: 'Beschikbaar vanaf 30 september 2026',
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
      text: '© {year} Alexandru Burtea. Alle rechten voorbehouden.',
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

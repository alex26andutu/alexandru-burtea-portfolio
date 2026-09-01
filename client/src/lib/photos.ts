export type PhotoCategory =
  | 'kitchen'
  | 'living_room'
  | 'bedroom_wardrobe'
  | 'hallway'
  | 'dressing_room'
  | 'bathroom'
  | 'office_reception';

/**
 * 'wide'  — landscape shot; spans 2 grid columns at 3/2.
 * 'tall'  — portrait / detail shot; spans 1 column at 3/4.
 * Seeded from the real pixel dimensions of each file, then hand-editable:
 * a landscape photo can be marked 'tall' to demote it in the grid, or a
 * portrait one marked 'wide' to feature it. Nothing reads the file at runtime.
 */
export type Orientation = 'wide' | 'tall';

/** Optional caption, shown over wide shots only. Both languages required. */
export interface Caption {
  en: string;
  nl: string;
}

export interface Photo {
  id: string;
  /** Base path with no extension, e.g. '/images/kitchen_01'. */
  base: string;
  /** Full JPEG path — the universally supported fallback. */
  src: string;
  category: PhotoCategory;
  orientation: Orientation;
  alt: string;
  caption?: Caption;
}

const categoryLabel: Record<PhotoCategory, string> = {
  kitchen: 'kitchen',
  living_room: 'living room',
  bedroom_wardrobe: 'bedroom wardrobe',
  hallway: 'hallway storage',
  dressing_room: 'dressing room',
  bathroom: 'bathroom cabinetry',
  office_reception: 'office / reception',
};

function makeAlt(category: PhotoCategory, idx: number, custom?: string): string {
  if (custom) return custom;
  return `Custom ${categoryLabel[category]} project #${idx} — handcrafted by Alexandru Burtea`;
}

/*
 * Every file here ships as .jpg + .webp + .avif (see scripts that generated
 * them). `file` is always the .jpg; the other two are derived by swapping the
 * extension in photoSources() below. If you ever add a photo without all three
 * variants, add it here WITH its real extension and give it its own entry in
 * the format map — do not assume the siblings exist.
 */
type Source = {
  id: string;
  file: string;
  category: PhotoCategory;
  orientation: Orientation;
  /** Owner-written caption. Wide shots only; leave undefined for no caption. */
  caption?: Caption;
  description?: string;
};

/*
 * CAPTIONS — the 12 entries below are DRAFTS written by describing what is
 * visible in each photo. They are not the owner's words yet: review, correct
 * any material or construction detail that is wrong, and rewrite in your own
 * voice. Captions render on 'wide' photos only; a photo without one shows no
 * caption and no gradient. Both languages are required by the type.
 */
const sources: Source[] = [
  // ── kitchen (17) ─────────────────────────────────────────
  // Curated first 6: these are what the grid shows before "view all".
  { id: 'kitchen_06', file: 'kitchen_06.jpg', category: 'kitchen', orientation: 'wide',
    // DRAFT caption — written from what is visible; owner to review/replace.
    caption: { en: 'Handleless kitchen with fluted fronts and a walnut tall unit; integrated hob with downdraft extractor, laid over herringbone oak.',
               nl: 'Greeploze keuken met geribbelde fronten en een notenhouten kastenwand; kookplaat met downdraft-afzuiging, op visgraat eikenparket.' } },
  { id: 'kitchen_02', file: 'kitchen_02.jpg', category: 'kitchen', orientation: 'tall' },
  { id: 'kitchen_09', file: 'kitchen_09.jpg', category: 'kitchen', orientation: 'tall' },
  { id: 'kitchen_05', file: 'kitchen_05.jpg', category: 'kitchen', orientation: 'tall' },
  { id: 'kitchen_01', file: 'kitchen_01.jpg', category: 'kitchen', orientation: 'tall' },
  { id: 'kitchen_14', file: 'kitchen_14.jpg', category: 'kitchen', orientation: 'wide',
    // DRAFT caption — written from what is visible; owner to review/replace.
    caption: { en: 'Deep green units with a marble-effect splashback and glazed upper cabinet; integrated oven and hob, LED strip under the wall units.',
               nl: 'Donkergroene fronten met marmerlook achterwand en een glazen bovenkast; ingebouwde oven en kookplaat, ledstrip onder de bovenkasten.' } },
  // Remaining photos — reachable via "view all" and in the slideshow.
  { id: 'kitchen_03', file: 'kitchen_03.jpg', category: 'kitchen', orientation: 'tall' },
  { id: 'kitchen_04', file: 'kitchen_04.jpg', category: 'kitchen', orientation: 'tall' },
  { id: 'kitchen_07', file: 'kitchen_07.jpg', category: 'kitchen', orientation: 'tall' },
  { id: 'kitchen_08', file: 'kitchen_08.jpg', category: 'kitchen', orientation: 'wide' },
  { id: 'kitchen_10', file: 'kitchen_10.jpg', category: 'kitchen', orientation: 'wide' },
  { id: 'kitchen_11', file: 'kitchen_11.jpg', category: 'kitchen', orientation: 'tall' },
  { id: 'kitchen_12', file: 'kitchen_12.jpg', category: 'kitchen', orientation: 'wide' },
  { id: 'kitchen_13', file: 'kitchen_13.jpg', category: 'kitchen', orientation: 'tall' },
  { id: 'kitchen_15', file: 'kitchen_15.jpg', category: 'kitchen', orientation: 'wide' },
  { id: 'kitchen_16', file: 'kitchen_16.jpg', category: 'kitchen', orientation: 'wide' },
  { id: 'kitchen_17', file: 'kitchen_17.jpg', category: 'kitchen', orientation: 'wide' },

  // ── living_room (19) ─────────────────────────────────────────
  // Curated first 6: these are what the grid shows before "view all".
  { id: 'living_room_10', file: 'living_room_10.jpg', category: 'living_room', orientation: 'wide',
    // DRAFT caption — written from what is visible; owner to review/replace.
    caption: { en: 'Media wall in slatted walnut with a backlit stone panel; floating cabinet with concealed LED strip underneath.',
               nl: 'Mediawand in geribbeld notenhout met een verlicht steenpaneel; zwevend kastdeel met verborgen ledstrip eronder.' } },
  { id: 'living_room_13', file: 'living_room_13.jpg', category: 'living_room', orientation: 'tall' },
  { id: 'living_room_05', file: 'living_room_05.jpg', category: 'living_room', orientation: 'tall' },
  { id: 'living_room_06', file: 'living_room_06.jpg', category: 'living_room', orientation: 'tall' },
  { id: 'living_room_14', file: 'living_room_14.jpg', category: 'living_room', orientation: 'tall' },
  { id: 'living_room_11', file: 'living_room_11.jpg', category: 'living_room', orientation: 'wide',
    // DRAFT caption — written from what is visible; owner to review/replace.
    caption: { en: 'Fitted dresser in painted shaker style: glazed upper cabinets, banks of drawers with cup handles, dark worktop and a sliding library ladder.',
               nl: 'Ingebouwde kast in geschilderde shakerstijl: bovenkasten met glas, ladeblokken met komgrepen, donker werkblad en een verrijdbare ladder.' } },
  // Remaining photos — reachable via "view all" and in the slideshow.
  { id: 'living_room_01', file: 'living_room_01.jpg', category: 'living_room', orientation: 'wide' },
  { id: 'living_room_02', file: 'living_room_02.jpg', category: 'living_room', orientation: 'wide' },
  { id: 'living_room_03', file: 'living_room_03.jpg', category: 'living_room', orientation: 'wide' },
  { id: 'living_room_04', file: 'living_room_04.jpg', category: 'living_room', orientation: 'wide' },
  { id: 'living_room_07', file: 'living_room_07.jpg', category: 'living_room', orientation: 'tall' },
  { id: 'living_room_08', file: 'living_room_08.jpg', category: 'living_room', orientation: 'wide' },
  { id: 'living_room_09', file: 'living_room_09.jpg', category: 'living_room', orientation: 'wide' },
  { id: 'living_room_12', file: 'living_room_12.jpg', category: 'living_room', orientation: 'tall' },
  { id: 'living_room_15', file: 'living_room_15.jpg', category: 'living_room', orientation: 'tall' },
  { id: 'living_room_16', file: 'living_room_16.jpg', category: 'living_room', orientation: 'tall' },
  { id: 'living_room_17', file: 'living_room_17.jpg', category: 'living_room', orientation: 'tall' },
  { id: 'living_room_18', file: 'living_room_18.jpg', category: 'living_room', orientation: 'wide' },
  { id: 'living_room_19', file: 'living_room_19.jpg', category: 'living_room', orientation: 'wide' },

  // ── bedroom_wardrobe (13) ─────────────────────────────────────────
  // Curated first 6: these are what the grid shows before "view all".
  { id: 'bedroom_wardrobe_06', file: 'bedroom_wardrobe_06.jpg', category: 'bedroom_wardrobe', orientation: 'wide',
    // DRAFT caption — written from what is visible; owner to review/replace.
    caption: { en: 'Walk-in wardrobe with black-framed glass doors and lit interior shelving, set against herringbone oak flooring.',
               nl: 'Inloopkast met zwart omkaderde glazen deuren en verlichte binnenschappen, op visgraat eikenparket.' } },
  { id: 'bedroom_wardrobe_01', file: 'bedroom_wardrobe_01.jpg', category: 'bedroom_wardrobe', orientation: 'tall' },
  { id: 'bedroom_wardrobe_05', file: 'bedroom_wardrobe_05.jpg', category: 'bedroom_wardrobe', orientation: 'tall' },
  { id: 'bedroom_wardrobe_09', file: 'bedroom_wardrobe_09.jpg', category: 'bedroom_wardrobe', orientation: 'tall' },
  { id: 'bedroom_wardrobe_02', file: 'bedroom_wardrobe_02.jpg', category: 'bedroom_wardrobe', orientation: 'tall' },
  { id: 'bedroom_wardrobe_13', file: 'bedroom_wardrobe_13.jpg', category: 'bedroom_wardrobe', orientation: 'wide',
    // DRAFT caption — written from what is visible; owner to review/replace.
    caption: { en: 'Dressing room run combining fluted panel doors with black-framed glass fronts; perimeter LED cove above.',
               nl: 'Kledingkamerwand met geribbelde paneeldeuren en zwart omkaderde glazen fronten; ledverlichting in de omlopende koof.' } },
  // Remaining photos — reachable via "view all" and in the slideshow.
  { id: 'bedroom_wardrobe_03', file: 'bedroom_wardrobe_03.jpg', category: 'bedroom_wardrobe', orientation: 'wide' },
  { id: 'bedroom_wardrobe_04', file: 'bedroom_wardrobe_04.jpg', category: 'bedroom_wardrobe', orientation: 'tall' },
  { id: 'bedroom_wardrobe_07', file: 'bedroom_wardrobe_07.jpg', category: 'bedroom_wardrobe', orientation: 'wide' },
  { id: 'bedroom_wardrobe_08', file: 'bedroom_wardrobe_08.jpg', category: 'bedroom_wardrobe', orientation: 'tall' },
  { id: 'bedroom_wardrobe_10', file: 'bedroom_wardrobe_10.jpg', category: 'bedroom_wardrobe', orientation: 'tall' },
  { id: 'bedroom_wardrobe_11', file: 'bedroom_wardrobe_11.jpg', category: 'bedroom_wardrobe', orientation: 'wide' },
  { id: 'bedroom_wardrobe_12', file: 'bedroom_wardrobe_12.jpg', category: 'bedroom_wardrobe', orientation: 'wide' },

  // ── bathroom (6) ─────────────────────────────────────────
  // Curated first 6: these are what the grid shows before "view all".
  { id: 'bathroom_01', file: 'bathroom_01.jpg', category: 'bathroom', orientation: 'wide',
    // DRAFT caption — written from what is visible; owner to review/replace.
    caption: { en: 'Painted vanity with a framed drawer front and brass knob; the drawer box is solid oak with fitted dividers.',
               nl: 'Geschilderd badmeubel met omlijst ladefront en messing knop; de ladebak is massief eiken met vaste vakverdeling.' } },
  { id: 'bathroom_02', file: 'bathroom_02.jpg', category: 'bathroom', orientation: 'tall' },
  { id: 'bathroom_03', file: 'bathroom_03.jpg', category: 'bathroom', orientation: 'tall' },
  { id: 'bathroom_05', file: 'bathroom_05.jpg', category: 'bathroom', orientation: 'tall' },
  { id: 'bathroom_06', file: 'bathroom_06.jpg', category: 'bathroom', orientation: 'tall' },
  { id: 'bathroom_04', file: 'bathroom_04.jpg', category: 'bathroom', orientation: 'wide',
    // DRAFT caption — written from what is visible; owner to review/replace.
    caption: { en: 'Double vanity with marble top and undermount basins; solid oak drawer boxes with hand-cut dovetail joints, on full-extension runners.',
               nl: 'Dubbel badmeubel met marmeren blad en onderbouwwastafels; massief eiken ladebakken met handgemaakte zwaluwstaartverbindingen, op volledig uittrekbare geleiders.' } },

  // ── hallway (6) ─────────────────────────────────────────
  // Curated first 6: these are what the grid shows before "view all".
  { id: 'hallway_06', file: 'hallway_06.jpg', category: 'hallway', orientation: 'wide',
    // DRAFT caption — written from what is visible; owner to review/replace.
    caption: { en: 'Hallway with a slatted timber divider and a full-height fitted wardrobe in a soft neutral finish.',
               nl: 'Hal met een houten lamellenscheidingswand en een vloer-tot-plafond inbouwkast in een zachte neutrale afwerking.' } },
  { id: 'hallway_03', file: 'hallway_03.jpg', category: 'hallway', orientation: 'tall' },
  { id: 'hallway_01', file: 'hallway_01.jpg', category: 'hallway', orientation: 'tall' },
  { id: 'hallway_02', file: 'hallway_02.jpg', category: 'hallway', orientation: 'tall' },
  { id: 'hallway_05', file: 'hallway_05.jpg', category: 'hallway', orientation: 'tall' },
  { id: 'hallway_04', file: 'hallway_04.jpg', category: 'hallway', orientation: 'tall' },

  // ── office_reception (8) ─────────────────────────────────────────
  // Curated first 6: these are what the grid shows before "view all".
  { id: 'office_reception_05', file: 'office_reception_05.jpg', category: 'office_reception', orientation: 'wide',
    // DRAFT caption — written from what is visible; owner to review/replace.
    caption: { en: 'Office storage wall in walnut and dark fluted panels, floor to ceiling, over herringbone flooring.',
               nl: 'Kantoorkastenwand in noten en donkere geribbelde panelen, van vloer tot plafond, op visgraatvloer.' } },
  { id: 'office_reception_01', file: 'office_reception_01.jpg', category: 'office_reception', orientation: 'tall' },
  { id: 'office_reception_06', file: 'office_reception_06.jpg', category: 'office_reception', orientation: 'tall' },
  { id: 'office_reception_08', file: 'office_reception_08.jpg', category: 'office_reception', orientation: 'tall' },
  { id: 'office_reception_03', file: 'office_reception_03.jpg', category: 'office_reception', orientation: 'tall' },
  { id: 'office_reception_02', file: 'office_reception_02.jpg', category: 'office_reception', orientation: 'wide',
    // DRAFT caption — written from what is visible; owner to review/replace.
    caption: { en: 'Full-wall office storage in pale oak, floor to ceiling with handleless push-to-open fronts and concealed hinges.',
               nl: 'Volledige kantoorkastenwand in licht eiken, vloer tot plafond met greeploze push-to-open fronten en verdekte scharnieren.' } },
  // Remaining photos — reachable via "view all" and in the slideshow.
  { id: 'office_reception_04', file: 'office_reception_04.jpg', category: 'office_reception', orientation: 'wide' },
  { id: 'office_reception_07', file: 'office_reception_07.jpg', category: 'office_reception', orientation: 'tall' },

];

const counters: Record<PhotoCategory, number> = {
  kitchen: 0,
  living_room: 0,
  bedroom_wardrobe: 0,
  hallway: 0,
  dressing_room: 0,
  bathroom: 0,
  office_reception: 0,
};

export const photos: Photo[] = sources.map((s) => {
  counters[s.category] += 1;
  const base = `/images/${s.file.replace(/\.[^.]+$/, '')}`;
  return {
    id: s.id,
    base,
    src: `${base}.jpg`,
    category: s.category,
    orientation: s.orientation,
    alt: makeAlt(s.category, counters[s.category], s.description),
    caption: s.caption,
  };
});

export const categoryOrder: PhotoCategory[] = [
  'kitchen',
  'living_room',
  'bedroom_wardrobe',
  'hallway',
  'dressing_room',
  'bathroom',
  'office_reception',
];

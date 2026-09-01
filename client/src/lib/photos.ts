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

export interface Photo {
  id: string;
  /** Base path with no extension, e.g. '/images/kitchen_01'. */
  base: string;
  /** Full JPEG path — the universally supported fallback. */
  src: string;
  category: PhotoCategory;
  orientation: Orientation;
  alt: string;
}

const categoryLabel: Record<PhotoCategory, string> = {
  kitchen: 'Kitchen',
  living_room: 'Living room',
  bedroom_wardrobe: 'Bedroom wardrobe',
  hallway: 'Hallway',
  dressing_room: 'Dressing room',
  bathroom: 'Bathroom',
  office_reception: 'Office / reception',
};

/*
 * Alt text names the room and the position in the set — nothing more.
 * It deliberately makes no claim about materials or how a piece was built:
 * those are the owner's to state, and only where he has verified them.
 */
function makeAlt(category: PhotoCategory, idx: number, custom?: string): string {
  if (custom) return custom;
  return `${categoryLabel[category]} — project ${idx}, Alexandru Burtea`;
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
  description?: string;
};

const sources: Source[] = [
  // ── kitchen (17) ─────────────────────────────────────────
  // Curated first 6: these are what the grid shows before "view all".
  { id: 'kitchen_06', file: 'kitchen_06.jpg', category: 'kitchen', orientation: 'wide' },
  { id: 'kitchen_02', file: 'kitchen_02.jpg', category: 'kitchen', orientation: 'tall' },
  { id: 'kitchen_09', file: 'kitchen_09.jpg', category: 'kitchen', orientation: 'tall' },
  { id: 'kitchen_05', file: 'kitchen_05.jpg', category: 'kitchen', orientation: 'tall' },
  { id: 'kitchen_01', file: 'kitchen_01.jpg', category: 'kitchen', orientation: 'tall' },
  { id: 'kitchen_14', file: 'kitchen_14.jpg', category: 'kitchen', orientation: 'wide' },
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
  { id: 'living_room_10', file: 'living_room_10.jpg', category: 'living_room', orientation: 'wide' },
  { id: 'living_room_13', file: 'living_room_13.jpg', category: 'living_room', orientation: 'tall' },
  { id: 'living_room_05', file: 'living_room_05.jpg', category: 'living_room', orientation: 'tall' },
  { id: 'living_room_06', file: 'living_room_06.jpg', category: 'living_room', orientation: 'tall' },
  { id: 'living_room_14', file: 'living_room_14.jpg', category: 'living_room', orientation: 'tall' },
  { id: 'living_room_11', file: 'living_room_11.jpg', category: 'living_room', orientation: 'wide' },
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
  { id: 'bedroom_wardrobe_06', file: 'bedroom_wardrobe_06.jpg', category: 'bedroom_wardrobe', orientation: 'wide' },
  { id: 'bedroom_wardrobe_01', file: 'bedroom_wardrobe_01.jpg', category: 'bedroom_wardrobe', orientation: 'tall' },
  { id: 'bedroom_wardrobe_05', file: 'bedroom_wardrobe_05.jpg', category: 'bedroom_wardrobe', orientation: 'tall' },
  { id: 'bedroom_wardrobe_09', file: 'bedroom_wardrobe_09.jpg', category: 'bedroom_wardrobe', orientation: 'tall' },
  { id: 'bedroom_wardrobe_02', file: 'bedroom_wardrobe_02.jpg', category: 'bedroom_wardrobe', orientation: 'tall' },
  { id: 'bedroom_wardrobe_13', file: 'bedroom_wardrobe_13.jpg', category: 'bedroom_wardrobe', orientation: 'wide' },
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
  { id: 'bathroom_01', file: 'bathroom_01.jpg', category: 'bathroom', orientation: 'wide' },
  { id: 'bathroom_02', file: 'bathroom_02.jpg', category: 'bathroom', orientation: 'tall' },
  { id: 'bathroom_03', file: 'bathroom_03.jpg', category: 'bathroom', orientation: 'tall' },
  { id: 'bathroom_05', file: 'bathroom_05.jpg', category: 'bathroom', orientation: 'tall' },
  { id: 'bathroom_06', file: 'bathroom_06.jpg', category: 'bathroom', orientation: 'tall' },
  { id: 'bathroom_04', file: 'bathroom_04.jpg', category: 'bathroom', orientation: 'wide' },

  // ── hallway (6) ─────────────────────────────────────────
  // Curated first 6: these are what the grid shows before "view all".
  { id: 'hallway_06', file: 'hallway_06.jpg', category: 'hallway', orientation: 'wide' },
  { id: 'hallway_03', file: 'hallway_03.jpg', category: 'hallway', orientation: 'tall' },
  { id: 'hallway_01', file: 'hallway_01.jpg', category: 'hallway', orientation: 'tall' },
  { id: 'hallway_02', file: 'hallway_02.jpg', category: 'hallway', orientation: 'tall' },
  { id: 'hallway_05', file: 'hallway_05.jpg', category: 'hallway', orientation: 'tall' },
  { id: 'hallway_04', file: 'hallway_04.jpg', category: 'hallway', orientation: 'tall' },

  // ── office_reception (8) ─────────────────────────────────────────
  // Curated first 6: these are what the grid shows before "view all".
  { id: 'office_reception_05', file: 'office_reception_05.jpg', category: 'office_reception', orientation: 'wide' },
  { id: 'office_reception_01', file: 'office_reception_01.jpg', category: 'office_reception', orientation: 'tall' },
  { id: 'office_reception_06', file: 'office_reception_06.jpg', category: 'office_reception', orientation: 'tall' },
  { id: 'office_reception_08', file: 'office_reception_08.jpg', category: 'office_reception', orientation: 'tall' },
  { id: 'office_reception_03', file: 'office_reception_03.jpg', category: 'office_reception', orientation: 'tall' },
  { id: 'office_reception_02', file: 'office_reception_02.jpg', category: 'office_reception', orientation: 'wide' },
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

/*
 * Categories that actually contain photos, in display order.
 *
 * Deliberately NOT categoryOrder itself: that list carries every category the
 * type allows, including ones with no photos yet (dressing_room today). The
 * gallery and the "categories" figure in the About stats must both count what
 * a visitor can really see, otherwise the number drifts from the work again.
 */
export const populatedCategories: PhotoCategory[] = categoryOrder.filter((cat) =>
  photos.some((p) => p.category === cat)
);

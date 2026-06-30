export type PhotoCategory =
  | 'kitchen'
  | 'living_room'
  | 'bedroom_wardrobe'
  | 'hallway'
  | 'dressing_room'
  | 'bathroom'
  | 'office_reception';

export interface Photo {
  id: string;
  src: string;
  category: PhotoCategory;
  alt: string;
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

type Source = {
  id: string;
  file: string;
  category: PhotoCategory;
  description?: string;
};

const sources: Source[] = [
  // Kitchen (18)
  { id: 'kitchen_01', file: 'kitchen_01.jpg', category: 'kitchen' },
  { id: 'kitchen_02', file: 'kitchen_02.jpg', category: 'kitchen' },
  { id: 'kitchen_03', file: 'kitchen_03.jpg', category: 'kitchen' },
  { id: 'kitchen_04', file: 'kitchen_04.jpg', category: 'kitchen' },
  { id: 'kitchen_05', file: 'kitchen_05.jpg', category: 'kitchen' },
  { id: 'kitchen_06', file: 'kitchen_06.jpg', category: 'kitchen' },
  { id: 'kitchen_07', file: 'kitchen_07.jpg', category: 'kitchen' },
  { id: 'kitchen_08', file: 'kitchen_08.jpg', category: 'kitchen' },
  { id: 'kitchen_09', file: 'kitchen_09.jpg', category: 'kitchen' },
  { id: 'kitchen_10', file: 'kitchen_10.jpg', category: 'kitchen' },
  { id: 'kitchen_11', file: 'kitchen_11.jpg', category: 'kitchen' },
  { id: 'kitchen_12', file: 'kitchen_12.jpg', category: 'kitchen' },
  { id: 'kitchen_13', file: 'kitchen_13.jpg', category: 'kitchen' },
  { id: 'kitchen_14', file: 'kitchen_14.jpg', category: 'kitchen' },
  { id: 'kitchen_15', file: 'kitchen_15.jpg', category: 'kitchen' },
  { id: 'kitchen_16', file: 'kitchen_16.jpg', category: 'kitchen' },
  { id: 'kitchen_17', file: 'kitchen_17.jpg', category: 'kitchen' },
  { id: 'kitchen_18', file: 'kitchen_18.jpg', category: 'kitchen' },

  // Living room (21)
  { id: 'living_room_01', file: 'living_room_01.jpg', category: 'living_room' },
  { id: 'living_room_02', file: 'living_room_02.jpg', category: 'living_room' },
  { id: 'living_room_03', file: 'living_room_03.jpg', category: 'living_room' },
  { id: 'living_room_04', file: 'living_room_04.jpg', category: 'living_room' },
  { id: 'living_room_05', file: 'living_room_05.jpg', category: 'living_room' },
  { id: 'living_room_06', file: 'living_room_06.jpg', category: 'living_room' },
  { id: 'living_room_07', file: 'living_room_07.jpg', category: 'living_room' },
  { id: 'living_room_08', file: 'living_room_08.jpg', category: 'living_room' },
  { id: 'living_room_09', file: 'living_room_09.jpg', category: 'living_room' },
  { id: 'living_room_10', file: 'living_room_10.jpg', category: 'living_room' },
  { id: 'living_room_11', file: 'living_room_11.jpg', category: 'living_room' },
  { id: 'living_room_12', file: 'living_room_12.jpg', category: 'living_room' },
  { id: 'living_room_13', file: 'living_room_13.jpg', category: 'living_room' },
  { id: 'living_room_14', file: 'living_room_14.jpg', category: 'living_room' },
  { id: 'living_room_15', file: 'living_room_15.jpg', category: 'living_room' },
  { id: 'living_room_16', file: 'living_room_16.jpg', category: 'living_room' },
  { id: 'living_room_17', file: 'living_room_17.jpg', category: 'living_room' },
  { id: 'living_room_18', file: 'living_room_18.jpg', category: 'living_room' },
  { id: 'living_room_19', file: 'living_room_19.jpg', category: 'living_room' },
  { id: 'living_room_20', file: 'living_room_20.jpg', category: 'living_room' },
  { id: 'living_room_21', file: 'living_room_21.jpg', category: 'living_room' },

  // Bedroom wardrobe (13)
  { id: 'bedroom_wardrobe_01', file: 'bedroom_wardrobe_01.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_02', file: 'bedroom_wardrobe_02.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_03', file: 'bedroom_wardrobe_03.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_04', file: 'bedroom_wardrobe_04.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_05', file: 'bedroom_wardrobe_05.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_06', file: 'bedroom_wardrobe_06.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_07', file: 'bedroom_wardrobe_07.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_08', file: 'bedroom_wardrobe_08.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_09', file: 'bedroom_wardrobe_09.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_10', file: 'bedroom_wardrobe_10.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_11', file: 'bedroom_wardrobe_11.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_12', file: 'bedroom_wardrobe_12.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_13', file: 'bedroom_wardrobe_13.jpg', category: 'bedroom_wardrobe' },

  // Bathroom (6)
  { id: 'bathroom_01', file: 'bathroom_01.jpg', category: 'bathroom' },
  { id: 'bathroom_02', file: 'bathroom_02.jpg', category: 'bathroom' },
  { id: 'bathroom_03', file: 'bathroom_03.jpg', category: 'bathroom' },
  { id: 'bathroom_04', file: 'bathroom_04.jpg', category: 'bathroom' },
  { id: 'bathroom_05', file: 'bathroom_05.jpg', category: 'bathroom' },
  { id: 'bathroom_06', file: 'bathroom_06.jpg', category: 'bathroom' },

  // Hallway (6)
  { id: 'hallway_01', file: 'hallway_01.jpg', category: 'hallway' },
  { id: 'hallway_02', file: 'hallway_02.jpg', category: 'hallway' },
  { id: 'hallway_03', file: 'hallway_03.jpg', category: 'hallway' },
  { id: 'hallway_04', file: 'hallway_04.jpg', category: 'hallway' },
  { id: 'hallway_05', file: 'hallway_05.jpg', category: 'hallway' },
  { id: 'hallway_06', file: 'hallway_06.jpg', category: 'hallway' },

  // Office / Reception (8)
  { id: 'office_reception_01', file: 'office_reception_01.jpg', category: 'office_reception' },
  { id: 'office_reception_02', file: 'office_reception_02.jpg', category: 'office_reception' },
  { id: 'office_reception_03', file: 'office_reception_03.jpg', category: 'office_reception' },
  { id: 'office_reception_04', file: 'office_reception_04.jpg', category: 'office_reception' },
  { id: 'office_reception_05', file: 'office_reception_05.jpg', category: 'office_reception' },
  { id: 'office_reception_06', file: 'office_reception_06.jpg', category: 'office_reception' },
  { id: 'office_reception_07', file: 'office_reception_07.jpg', category: 'office_reception' },
  { id: 'office_reception_08', file: 'office_reception_08.jpg', category: 'office_reception' },
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
  return {
    id: s.id,
    src: `/images/${s.file}`,
    category: s.category,
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

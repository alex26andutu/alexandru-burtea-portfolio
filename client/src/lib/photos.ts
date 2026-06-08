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

// Human-readable label per category for alt-text generation
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

// Sources (file basenames). Add a `description` when you want a richer alt text.
type Source = {
  id: string;
  file: string;
  category: PhotoCategory;
  description?: string;
};

const sources: Source[] = [
  { id: 'kitchen_01', file: 'IMG_0519.jpg', category: 'kitchen' },
  { id: 'kitchen_02', file: 'IMG_0563.jpg', category: 'kitchen' },
  { id: 'kitchen_03', file: 'IMG_1576.jpg', category: 'kitchen' },
  { id: 'kitchen_04', file: 'IMG_1577.jpg', category: 'kitchen' },
  { id: 'kitchen_05', file: 'IMG_1617.jpg', category: 'kitchen' },
  { id: 'kitchen_06', file: 'IMG_1657.jpg', category: 'kitchen' },
  { id: 'kitchen_07', file: 'IMG_1675.jpg', category: 'kitchen' },
  { id: 'kitchen_08', file: 'IMG_1676.jpg', category: 'kitchen' },
  { id: 'kitchen_09', file: 'IMG_1677.jpg', category: 'kitchen' },
  { id: 'kitchen_10', file: 'IMG_1678.jpg', category: 'kitchen' },
  { id: 'kitchen_11', file: 'IMG_1685.jpg', category: 'kitchen' },
  { id: 'kitchen_12', file: 'IMG_1686.jpg', category: 'kitchen' },
  { id: 'kitchen_13', file: 'IMG_1688.jpg', category: 'kitchen' },
  { id: 'kitchen_14', file: 'IMG_1732.jpg', category: 'kitchen' },
  { id: 'kitchen_15', file: 'IMG_1734.jpg', category: 'kitchen' },
  { id: 'kitchen_16', file: 'IMG_1736.jpg', category: 'kitchen' },
  { id: 'kitchen_17', file: 'IMG_1859.jpg', category: 'kitchen' },
  { id: 'kitchen_18', file: 'IMG_1860.jpg', category: 'kitchen' },
  { id: 'kitchen_19', file: 'IMG_3298.jpg', category: 'kitchen' },
  { id: 'kitchen_20', file: 'IMG_3299.jpg', category: 'kitchen' },
  { id: 'kitchen_21', file: 'IMG_3573.jpg', category: 'kitchen' },
  { id: 'kitchen_22', file: 'IMG_3732.jpg', category: 'kitchen' },
  { id: 'kitchen_23', file: 'IMG_3734.jpg', category: 'kitchen' },
  { id: 'kitchen_24', file: 'IMG_3738.jpg', category: 'kitchen' },
  { id: 'kitchen_25', file: 'IMG_3995.jpg', category: 'kitchen' },
  { id: 'kitchen_26', file: 'IMG_4364.jpg', category: 'kitchen' },
  { id: 'kitchen_27', file: 'IMG_4382.jpg', category: 'kitchen' },
  { id: 'kitchen_28', file: 'IMG_4446.jpg', category: 'kitchen' },
  { id: 'kitchen_29', file: 'IMG_5671.jpg', category: 'kitchen' },
  { id: 'kitchen_30', file: 'IMG_5673.jpg', category: 'kitchen' },
  { id: 'kitchen_31', file: 'IMG_5675-1.jpg', category: 'kitchen' },
  { id: 'kitchen_32', file: 'IMG_5874.jpg', category: 'kitchen' },
  { id: 'kitchen_33', file: 'IMG_6607.jpg', category: 'kitchen' },
  { id: 'kitchen_34', file: 'IMG_6609.jpg', category: 'kitchen' },
  { id: 'kitchen_35', file: 'IMG_6933.jpg', category: 'kitchen' },
  { id: 'kitchen_36', file: 'IMG_7161.jpg', category: 'kitchen' },
  { id: 'kitchen_37', file: 'IMG_7163.jpg', category: 'kitchen' },
  { id: 'kitchen_38', file: 'IMG_7199.jpg', category: 'kitchen' },
  { id: 'kitchen_39', file: 'IMG_7200.jpg', category: 'kitchen' },
  { id: 'kitchen_40', file: 'IMG_7245.jpg', category: 'kitchen' },
  { id: 'kitchen_41', file: 'IMG_7248.jpg', category: 'kitchen' },
  { id: 'kitchen_42', file: 'IMG_7250.jpg', category: 'kitchen' },
  { id: 'kitchen_43', file: 'IMG_7840.jpg', category: 'kitchen' },
  { id: 'kitchen_44', file: 'IMG_7988.jpg', category: 'kitchen' },
  { id: 'kitchen_45', file: 'IMG_8229.jpg', category: 'kitchen' },

  // Bedrooms (01–21) — full bedroom projects
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
  { id: 'bedroom_wardrobe_14', file: 'bedroom_wardrobe_14.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_15', file: 'bedroom_wardrobe_15.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_16', file: 'bedroom_wardrobe_16.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_17', file: 'bedroom_wardrobe_17.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_18', file: 'bedroom_wardrobe_18.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_19', file: 'bedroom_wardrobe_19.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_20', file: 'bedroom_wardrobe_20.jpg', category: 'bedroom_wardrobe' },
  { id: 'bedroom_wardrobe_21', file: 'bedroom_wardrobe_21.jpg', category: 'bedroom_wardrobe' },

  // Wardrobes / walk-in closets (22–52) — dressing room cabinetry
  { id: 'bedroom_wardrobe_22', file: 'bedroom_wardrobe_22.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_23', file: 'bedroom_wardrobe_23.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_24', file: 'bedroom_wardrobe_24.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_25', file: 'bedroom_wardrobe_25.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_26', file: 'bedroom_wardrobe_26.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_27', file: 'bedroom_wardrobe_27.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_28', file: 'bedroom_wardrobe_28.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_29', file: 'bedroom_wardrobe_29.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_30', file: 'bedroom_wardrobe_30.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_31', file: 'bedroom_wardrobe_31.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_32', file: 'bedroom_wardrobe_32.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_33', file: 'bedroom_wardrobe_33.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_34', file: 'bedroom_wardrobe_34.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_35', file: 'bedroom_wardrobe_35.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_36', file: 'bedroom_wardrobe_36.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_37', file: 'bedroom_wardrobe_37.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_38', file: 'bedroom_wardrobe_38.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_39', file: 'bedroom_wardrobe_39.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_40', file: 'bedroom_wardrobe_40.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_41', file: 'bedroom_wardrobe_41.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_42', file: 'bedroom_wardrobe_42.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_43', file: 'bedroom_wardrobe_43.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_44', file: 'bedroom_wardrobe_44.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_45', file: 'bedroom_wardrobe_45.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_46', file: 'bedroom_wardrobe_46.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_47', file: 'bedroom_wardrobe_47.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_48', file: 'bedroom_wardrobe_48.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_49', file: 'bedroom_wardrobe_49.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_50', file: 'bedroom_wardrobe_50.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_51', file: 'bedroom_wardrobe_51.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },
  { id: 'bedroom_wardrobe_52', file: 'bedroom_wardrobe_52.jpg', category: 'bedroom_wardrobe', description: 'Custom walk-in wardrobe — handcrafted by Alexandru Burtea' },

  // Living rooms — custom TV walls, shelving, sideboards, lounge cabinetry
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
  { id: 'living_room_22', file: 'living_room_22.jpg', category: 'living_room' },
  { id: 'living_room_23', file: 'living_room_23.jpg', category: 'living_room' },
  { id: 'living_room_24', file: 'living_room_24.jpg', category: 'living_room' },
  { id: 'living_room_25', file: 'living_room_25.jpg', category: 'living_room' },
  { id: 'living_room_26', file: 'living_room_26.jpg', category: 'living_room' },
  { id: 'living_room_27', file: 'living_room_27.jpg', category: 'living_room' },
  { id: 'living_room_28', file: 'living_room_28.jpg', category: 'living_room' },
  { id: 'living_room_29', file: 'living_room_29.jpg', category: 'living_room' },
  { id: 'living_room_30', file: 'living_room_30.jpg', category: 'living_room' },
  { id: 'living_room_31', file: 'living_room_31.jpg', category: 'living_room' },
  { id: 'living_room_32', file: 'living_room_32.jpg', category: 'living_room' },
  { id: 'living_room_33', file: 'living_room_33.jpg', category: 'living_room' },
  { id: 'living_room_34', file: 'living_room_34.jpg', category: 'living_room' },
  { id: 'living_room_35', file: 'living_room_35.jpg', category: 'living_room' },
  { id: 'living_room_36', file: 'living_room_36.jpg', category: 'living_room' },
  { id: 'living_room_37', file: 'living_room_37.jpg', category: 'living_room' },
  { id: 'living_room_38', file: 'living_room_38.jpg', category: 'living_room' },
  { id: 'living_room_39', file: 'living_room_39.jpg', category: 'living_room' },
  { id: 'living_room_40', file: 'living_room_40.jpg', category: 'living_room' },

  // Bathrooms — custom vanities, storage units, mirror cabinetry
  { id: 'bathroom_01', file: 'bathroom_01.jpg', category: 'bathroom' },
  { id: 'bathroom_02', file: 'bathroom_02.jpg', category: 'bathroom' },
  { id: 'bathroom_03', file: 'bathroom_03.jpg', category: 'bathroom' },
  { id: 'bathroom_04', file: 'bathroom_04.jpg', category: 'bathroom' },
  { id: 'bathroom_05', file: 'bathroom_05.jpg', category: 'bathroom' },
  { id: 'bathroom_06', file: 'bathroom_06.jpg', category: 'bathroom' },
  { id: 'bathroom_07', file: 'bathroom_07.jpg', category: 'bathroom' },
  { id: 'bathroom_08', file: 'bathroom_08.jpg', category: 'bathroom' },
  { id: 'bathroom_09', file: 'bathroom_09.jpg', category: 'bathroom' },
  { id: 'bathroom_10', file: 'bathroom_10.jpg', category: 'bathroom' },
  { id: 'bathroom_11', file: 'bathroom_11.jpg', category: 'bathroom' },
  { id: 'bathroom_12', file: 'bathroom_12.jpg', category: 'bathroom' },
  { id: 'bathroom_13', file: 'bathroom_13.jpg', category: 'bathroom' },
  { id: 'bathroom_14', file: 'bathroom_14.jpg', category: 'bathroom' },
  { id: 'bathroom_15', file: 'bathroom_15.jpg', category: 'bathroom' },
  { id: 'bathroom_16', file: 'bathroom_16.jpg', category: 'bathroom' },
  { id: 'bathroom_17', file: 'bathroom_17.jpg', category: 'bathroom' },
  { id: 'bathroom_18', file: 'bathroom_18.jpg', category: 'bathroom' },
  { id: 'bathroom_19', file: 'bathroom_19.jpg', category: 'bathroom' },
  { id: 'bathroom_20', file: 'bathroom_20.jpg', category: 'bathroom' },
  { id: 'bathroom_21', file: 'bathroom_21.jpg', category: 'bathroom' },
  { id: 'bathroom_22', file: 'bathroom_22.jpg', category: 'bathroom' },
  { id: 'bathroom_23', file: 'bathroom_23.jpg', category: 'bathroom' },
  { id: 'bathroom_24', file: 'bathroom_24.jpg', category: 'bathroom' },
  { id: 'bathroom_25', file: 'bathroom_25.jpg', category: 'bathroom' },
  { id: 'bathroom_26', file: 'bathroom_26.jpg', category: 'bathroom' },
  { id: 'bathroom_27', file: 'bathroom_27.jpg', category: 'bathroom' },
  { id: 'bathroom_28', file: 'bathroom_28.jpg', category: 'bathroom' },
  { id: 'bathroom_29', file: 'bathroom_29.jpg', category: 'bathroom' },
  { id: 'bathroom_30', file: 'bathroom_30.jpg', category: 'bathroom' },

  // Offices & Receptions — custom reception desks, office cabinetry, workspace built-ins
  { id: 'office_reception_01', file: 'office_reception_01.jpg', category: 'office_reception' },
  { id: 'office_reception_02', file: 'office_reception_02.jpg', category: 'office_reception' },
  { id: 'office_reception_03', file: 'office_reception_03.jpg', category: 'office_reception' },
  { id: 'office_reception_04', file: 'office_reception_04.jpg', category: 'office_reception' },
  { id: 'office_reception_05', file: 'office_reception_05.jpg', category: 'office_reception' },
  { id: 'office_reception_06', file: 'office_reception_06.jpg', category: 'office_reception' },
  { id: 'office_reception_07', file: 'office_reception_07.jpg', category: 'office_reception' },
  { id: 'office_reception_08', file: 'office_reception_08.jpg', category: 'office_reception' },
  { id: 'office_reception_09', file: 'office_reception_09.jpg', category: 'office_reception' },
  { id: 'office_reception_10', file: 'office_reception_10.jpg', category: 'office_reception' },
  { id: 'office_reception_11', file: 'office_reception_11.jpg', category: 'office_reception' },
  { id: 'office_reception_12', file: 'office_reception_12.jpg', category: 'office_reception' },
  { id: 'office_reception_13', file: 'office_reception_13.jpg', category: 'office_reception' },
  { id: 'office_reception_14', file: 'office_reception_14.jpg', category: 'office_reception' },

  // Hallways — entryway storage, shoe cabinetry, coat units
  { id: 'hallway_01', file: 'hallway_01.jpg', category: 'hallway' },
  { id: 'hallway_02', file: 'hallway_02.jpg', category: 'hallway' },
  { id: 'hallway_03', file: 'hallway_03.jpg', category: 'hallway' },
  { id: 'hallway_04', file: 'hallway_04.jpg', category: 'hallway' },
  { id: 'hallway_05', file: 'hallway_05.jpg', category: 'hallway' },
  { id: 'hallway_06', file: 'hallway_06.jpg', category: 'hallway' },
  { id: 'hallway_07', file: 'hallway_07.jpg', category: 'hallway' },
  { id: 'hallway_08', file: 'hallway_08.jpg', category: 'hallway' },
  { id: 'hallway_09', file: 'hallway_09.jpg', category: 'hallway' },
  { id: 'hallway_10', file: 'hallway_10.jpg', category: 'hallway' },
];

// Track per-category index so each photo gets a unique number in its alt-text
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

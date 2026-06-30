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
  { id: 'portfolio_01', file: 'portfolio_01.jpg', category: 'kitchen' },
  { id: 'portfolio_02', file: 'portfolio_02.jpg', category: 'kitchen' },
  { id: 'portfolio_03', file: 'portfolio_03.jpg', category: 'kitchen' },
  { id: 'portfolio_04', file: 'portfolio_04.jpg', category: 'kitchen' },
  { id: 'portfolio_05', file: 'portfolio_05.jpg', category: 'kitchen' },
  { id: 'portfolio_06', file: 'portfolio_06.jpg', category: 'kitchen' },
  { id: 'portfolio_07', file: 'portfolio_07.jpg', category: 'kitchen' },
  { id: 'portfolio_08', file: 'portfolio_08.jpg', category: 'kitchen' },
  { id: 'portfolio_09', file: 'portfolio_09.jpg', category: 'kitchen' },
  { id: 'portfolio_10', file: 'portfolio_10.jpg', category: 'kitchen' },
  { id: 'portfolio_11', file: 'portfolio_11.jpg', category: 'kitchen' },
  { id: 'portfolio_12', file: 'portfolio_12.jpg', category: 'kitchen' },
  { id: 'portfolio_13', file: 'portfolio_13.jpg', category: 'kitchen' },
  { id: 'portfolio_14', file: 'portfolio_14.jpg', category: 'kitchen' },
  { id: 'portfolio_15', file: 'portfolio_15.jpg', category: 'kitchen' },
  { id: 'portfolio_16', file: 'portfolio_16.jpg', category: 'kitchen' },
  { id: 'portfolio_17', file: 'portfolio_17.jpg', category: 'kitchen' },
  { id: 'portfolio_18', file: 'portfolio_18.jpg', category: 'kitchen' },
  { id: 'portfolio_19', file: 'portfolio_19.jpg', category: 'kitchen' },
  { id: 'portfolio_20', file: 'portfolio_20.jpg', category: 'kitchen' },
  { id: 'portfolio_21', file: 'portfolio_21.jpg', category: 'kitchen' },
  { id: 'portfolio_22', file: 'portfolio_22.jpg', category: 'kitchen' },
  { id: 'portfolio_23', file: 'portfolio_23.jpg', category: 'kitchen' },
  { id: 'portfolio_24', file: 'portfolio_24.jpg', category: 'kitchen' },
  { id: 'portfolio_25', file: 'portfolio_25.jpg', category: 'kitchen' },
  { id: 'portfolio_26', file: 'portfolio_26.jpg', category: 'kitchen' },
  { id: 'portfolio_27', file: 'portfolio_27.jpg', category: 'kitchen' },
  { id: 'portfolio_28', file: 'portfolio_28.jpg', category: 'kitchen' },
  { id: 'portfolio_29', file: 'portfolio_29.jpg', category: 'kitchen' },
  { id: 'portfolio_30', file: 'portfolio_30.jpg', category: 'kitchen' },
  { id: 'portfolio_31', file: 'portfolio_31.jpg', category: 'kitchen' },
  { id: 'portfolio_32', file: 'portfolio_32.jpg', category: 'kitchen' },
  { id: 'portfolio_33', file: 'portfolio_33.jpg', category: 'kitchen' },
  { id: 'portfolio_34', file: 'portfolio_34.jpg', category: 'kitchen' },
  { id: 'portfolio_35', file: 'portfolio_35.jpg', category: 'kitchen' },
  { id: 'portfolio_36', file: 'portfolio_36.jpg', category: 'kitchen' },
  { id: 'portfolio_37', file: 'portfolio_37.jpg', category: 'kitchen' },
  { id: 'portfolio_38', file: 'portfolio_38.jpg', category: 'kitchen' },
  { id: 'portfolio_39', file: 'portfolio_39.jpg', category: 'kitchen' },
  { id: 'portfolio_40', file: 'portfolio_40.jpg', category: 'kitchen' },
  { id: 'portfolio_41', file: 'portfolio_41.jpg', category: 'kitchen' },
  { id: 'portfolio_42', file: 'portfolio_42.jpg', category: 'kitchen' },
  { id: 'portfolio_43', file: 'portfolio_43.jpg', category: 'kitchen' },
  { id: 'portfolio_44', file: 'portfolio_44.jpg', category: 'kitchen' },
  { id: 'portfolio_45', file: 'portfolio_45.jpg', category: 'kitchen' },
  { id: 'portfolio_46', file: 'portfolio_46.jpg', category: 'kitchen' },
  { id: 'portfolio_47', file: 'portfolio_47.jpg', category: 'kitchen' },
  { id: 'portfolio_48', file: 'portfolio_48.jpg', category: 'kitchen' },
  { id: 'portfolio_49', file: 'portfolio_49.jpg', category: 'kitchen' },
  { id: 'portfolio_50', file: 'portfolio_50.jpg', category: 'kitchen' },
  { id: 'portfolio_51', file: 'portfolio_51.jpg', category: 'kitchen' },
  { id: 'portfolio_52', file: 'portfolio_52.jpg', category: 'kitchen' },
  { id: 'portfolio_53', file: 'portfolio_53.jpg', category: 'kitchen' },
  { id: 'portfolio_54', file: 'portfolio_54.jpg', category: 'kitchen' },
  { id: 'portfolio_55', file: 'portfolio_55.jpg', category: 'kitchen' },
  { id: 'portfolio_56', file: 'portfolio_56.jpg', category: 'kitchen' },
  { id: 'portfolio_57', file: 'portfolio_57.jpg', category: 'kitchen' },
  { id: 'portfolio_58', file: 'portfolio_58.jpg', category: 'kitchen' },
  { id: 'portfolio_59', file: 'portfolio_59.jpg', category: 'kitchen' },
  { id: 'portfolio_60', file: 'portfolio_60.jpg', category: 'kitchen' },
  { id: 'portfolio_61', file: 'portfolio_61.jpg', category: 'kitchen' },
  { id: 'portfolio_62', file: 'portfolio_62.jpg', category: 'kitchen' },
  { id: 'portfolio_63', file: 'portfolio_63.jpg', category: 'kitchen' },
  { id: 'portfolio_64', file: 'portfolio_64.jpg', category: 'kitchen' },
  { id: 'portfolio_65', file: 'portfolio_65.jpg', category: 'kitchen' },
  { id: 'portfolio_66', file: 'portfolio_66.jpg', category: 'kitchen' },
  { id: 'portfolio_67', file: 'portfolio_67.jpg', category: 'kitchen' },
  { id: 'portfolio_68', file: 'portfolio_68.jpg', category: 'kitchen' },
  { id: 'portfolio_69', file: 'portfolio_69.jpg', category: 'kitchen' },
  { id: 'portfolio_70', file: 'portfolio_70.jpg', category: 'kitchen' },
  { id: 'portfolio_71', file: 'portfolio_71.jpg', category: 'kitchen' },
  { id: 'portfolio_72', file: 'portfolio_72.jpg', category: 'kitchen' },
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

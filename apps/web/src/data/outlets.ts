export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Rice & Classics' | 'Grills & Suya' | 'Sides' | 'Drinks';
  popular?: boolean;
}

export interface Outlet {
  id: string;
  slug: string;
  name: string;
  address: string;
  area: string;
  distanceKm: number;
  prepTime: string;
  deliversToUser: boolean;
  isOpen: boolean;
  hours: string;
  phone: string;
  image: string;
  menu: MenuItem[];
}

export const INITIAL_OUTLETS: Outlet[] = [
  {
    id: 'lekki-1',
    slug: 'lekki-phase-1',
    name: 'Lekki Phase 1',
    address: '12 Admiralty Way, Lekki',
    area: 'Lekki / Victoria Island Corridor',
    distanceKm: 1.2,
    prepTime: '30–40 min',
    deliversToUser: true,
    isOpen: true,
    hours: '9:00 AM – 10:00 PM',
    phone: '0800 2852 266',
    image: '/images/storefront.jpg',
    menu: [
      {
        id: 'jollof-box',
        name: 'Smoky Party Jollof & Grilled Chicken',
        description: 'Firewood-smoked jollof rice served with juicy quarter grilled chicken, golden dodo, and pepper relish.',
        price: 4800,
        category: 'Rice & Classics',
        popular: true,
      },
      {
        id: 'suya-platter',
        name: 'Prime Beef Suya & Roasted Potatoes',
        description: 'Tender sliced beef infused with authentic Yaji spice blend, red onions, tomatoes, and spiced wedges.',
        price: 6500,
        category: 'Grills & Suya',
        popular: true,
      },
      {
        id: 'dodo-extra',
        name: 'Sweet Fried Plantain (Dodo)',
        description: 'Caramelized ripe plantains fried to golden perfection.',
        price: 1500,
        category: 'Sides',
      },
      {
        id: 'zobo-hibiscus',
        name: 'Chilled Artisanal Zobo Spritz',
        description: 'Infused with fresh ginger, cloves, fresh lime slices, and garden mint.',
        price: 1800,
        category: 'Drinks',
        popular: true,
      },
    ],
  },
  {
    id: 'vi',
    slug: 'victoria-island',
    name: 'Victoria Island',
    address: '28 Akin Adesola Street, VI',
    area: 'Victoria Island & Ikoyi',
    distanceKm: 6.8,
    prepTime: '40–50 min',
    deliversToUser: true,
    isOpen: true,
    hours: '9:00 AM – 10:00 PM',
    phone: '0800 2852 267',
    image: '/images/interior.jpg',
    menu: [
      {
        id: 'fried-rice-box',
        name: 'Special Buka Fried Rice & Crispy Fish',
        description: 'Wok-tossed basmati with sweet corn, liver, carrots, and whole seasoned croaker fish.',
        price: 5200,
        category: 'Rice & Classics',
        popular: true,
      },
      {
        id: 'suya-platter',
        name: 'Prime Beef Suya & Roasted Potatoes',
        description: 'Tender sliced beef infused with authentic Yaji spice blend, red onions, tomatoes, and spiced wedges.',
        price: 6500,
        category: 'Grills & Suya',
        popular: true,
      },
      {
        id: 'peppered-goat',
        name: 'Slow-Cooked Asun (Spiced Goat Meat)',
        description: 'Wood-fired smoked goat meat tossed in habanero, bell peppers, and scallions.',
        price: 5800,
        category: 'Grills & Suya',
      },
      {
        id: 'zobo-hibiscus',
        name: 'Chilled Artisanal Zobo Spritz',
        description: 'Infused with fresh ginger, cloves, fresh lime slices, and garden mint.',
        price: 1800,
        category: 'Drinks',
      },
    ],
  },
  {
    id: 'ikeja',
    slug: 'ikeja-gra',
    name: 'Ikeja GRA',
    address: '8 Isaac John Street, Ikeja',
    area: 'Ikeja & Mainland Hub',
    distanceKm: 24.0,
    prepTime: 'Pickup only',
    deliversToUser: false,
    isOpen: true,
    hours: '9:00 AM – 10:00 PM',
    phone: '0800 2852 268',
    image: '/images/storefront.jpg',
    menu: [
      {
        id: 'jollof-box',
        name: 'Smoky Party Jollof & Grilled Chicken',
        description: 'Firewood-smoked jollof rice served with juicy quarter grilled chicken, golden dodo, and pepper relish.',
        price: 4800,
        category: 'Rice & Classics',
        popular: true,
      },
      {
        id: 'suya-wings',
        name: 'Yaji Spiced Jumbo Wings (6 pcs)',
        description: 'Flame-grilled chicken wings glazed in honey-yaji suya sauce.',
        price: 4200,
        category: 'Grills & Suya',
      },
      {
        id: 'zobo-hibiscus',
        name: 'Chilled Artisanal Zobo Spritz',
        description: 'Infused with fresh ginger, cloves, fresh lime slices, and garden mint.',
        price: 1800,
        category: 'Drinks',
      },
    ],
  },
  {
    id: 'yaba',
    slug: 'yaba',
    name: 'Yaba',
    address: '42 Herbert Macaulay Way, Yaba',
    area: 'Yaba & Tech Corridor',
    distanceKm: 16.0,
    prepTime: 'Pickup only',
    deliversToUser: false,
    isOpen: true,
    hours: '9:00 AM – 10:00 PM',
    phone: '0800 2852 269',
    image: '/images/interior.jpg',
    menu: [
      {
        id: 'jollof-box',
        name: 'Smoky Party Jollof & Grilled Chicken',
        description: 'Firewood-smoked jollof rice served with juicy quarter grilled chicken, golden dodo, and pepper relish.',
        price: 4800,
        category: 'Rice & Classics',
        popular: true,
      },
      {
        id: 'beans-dodo',
        name: 'Slow Stewed Ewa Aganyin & Dodo',
        description: 'Mashed tender black-eyed beans drenched in authentic spicy blackened palm oil sauce.',
        price: 3600,
        category: 'Rice & Classics',
      },
      {
        id: 'zobo-hibiscus',
        name: 'Chilled Artisanal Zobo Spritz',
        description: 'Infused with fresh ginger, cloves, fresh lime slices, and garden mint.',
        price: 1800,
        category: 'Drinks',
      },
    ],
  },
  {
    id: 'surulere',
    slug: 'surulere',
    name: 'Surulere',
    address: '16 Adeniran Ogunsanya Street',
    area: 'Surulere & Environs',
    distanceKm: 19.0,
    prepTime: 'Pickup only',
    deliversToUser: false,
    isOpen: true,
    hours: '9:00 AM – 10:00 PM',
    phone: '0800 2852 270',
    image: '/images/storefront.jpg',
    menu: [
      {
        id: 'jollof-box',
        name: 'Smoky Party Jollof & Grilled Chicken',
        description: 'Firewood-smoked jollof rice served with juicy quarter grilled chicken, golden dodo, and pepper relish.',
        price: 4800,
        category: 'Rice & Classics',
        popular: true,
      },
      {
        id: 'suya-platter',
        name: 'Prime Beef Suya & Roasted Potatoes',
        description: 'Tender sliced beef infused with authentic Yaji spice blend, red onions, tomatoes, and spiced wedges.',
        price: 6500,
        category: 'Grills & Suya',
        popular: true,
      },
      {
        id: 'zobo-hibiscus',
        name: 'Chilled Artisanal Zobo Spritz',
        description: 'Infused with fresh ginger, cloves, fresh lime slices, and garden mint.',
        price: 1800,
        category: 'Drinks',
      },
    ],
  },
];

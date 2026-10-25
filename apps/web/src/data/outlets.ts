export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  categories: string[];
  tag?: string;
  tagType?: 'bestseller' | 'heat' | 'fresh' | 'sides' | 'favourite';
  popular?: boolean;
  image: string;
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
  rating: number;
  reviewCount: number;
  deliveryFee: number;
  menu: MenuItem[];
}

export const CROWD_FAVOURITES: MenuItem[] = [
  {
    id: 'smoky-jollof-chicken',
    name: 'Smoky Jollof & Chicken',
    tag: 'Bestseller',
    tagType: 'bestseller',
    description: 'Party-style jollof with our signature pepper-grilled chicken.',
    price: 6500,
    image: '/images/menu-jollof.jpg',
    category: 'Rice bowls',
    categories: ['Popular', 'Rice bowls'],
  },
  {
    id: 'suya-beef-bowl',
    name: 'Suya Beef Bowl',
    tag: 'A little heat',
    tagType: 'heat',
    description: 'Flame-grilled beef suya, seasoned rice, and fresh slaw.',
    price: 7000,
    image: '/images/menu-suya-bowl.jpg',
    category: 'Grills & suya',
    categories: ['Popular', 'Grills & suya', 'Rice bowls'],
  },
  {
    id: 'garden-fried-rice',
    name: 'Garden Fried Rice',
    tag: 'Freshly made',
    tagType: 'fresh',
    description: 'Colourful veggie fried rice with tender grilled chicken.',
    price: 6000,
    image: '/images/menu-fried-rice.jpg',
    category: 'Rice bowls',
    categories: ['Popular', 'Rice bowls'],
  },
  {
    id: 'sweet-fried-plantain',
    name: 'Sweet Fried Plantain',
    tag: 'Sides',
    tagType: 'sides',
    description: 'Golden, caramelised dodo. The perfect extra.',
    price: 1000,
    image: '/images/menu-dodo.jpg',
    category: 'Sides',
    categories: ['Popular', 'Sides'],
  },
  {
    id: 'house-zobo',
    name: 'House Zobo',
    tag: 'House favourite',
    tagType: 'favourite',
    description: 'Hibiscus, ginger, and pineapple. Chilled, 50cl.',
    price: 1500,
    image: '/images/menu-zobo.jpg',
    category: 'Drinks',
    categories: ['Popular', 'Drinks'],
  },
  {
    id: 'leaf-wrapped-moi-moi',
    name: 'Leaf-wrapped Moi Moi',
    tag: 'Sides',
    tagType: 'sides',
    description: 'Soft steamed beans with egg, wrapped the proper way.',
    price: 1800,
    image: '/images/menu-moi-moi.jpg',
    category: 'Sides',
    categories: ['Popular', 'Sides'],
  },
  // Additional items for other categories
  {
    id: 'prime-beef-suya',
    name: 'Prime Beef Suya Platter',
    tag: 'A little heat',
    tagType: 'heat',
    description: 'Thinly sliced tender beef infused with authentic Yaji spice blend, red onions & tomatoes.',
    price: 6500,
    image: '/images/suya-grill.jpg',
    category: 'Grills & suya',
    categories: ['Grills & suya'],
  },
  {
    id: 'spicy-asun-goat',
    name: 'Slow-Smoked Asun (Goat Meat)',
    tag: 'Bestseller',
    tagType: 'bestseller',
    description: 'Wood-fired peppered goat meat tossed in habanero peppers and diced scallions.',
    price: 5500,
    image: '/images/suya-grill.jpg',
    category: 'Grills & suya',
    categories: ['Grills & suya'],
  },
  {
    id: 'jollof-suya-combo',
    name: 'The Buka Feast Box (Combo for 2)',
    tag: 'House favourite',
    tagType: 'favourite',
    description: 'Smoky party jollof, double grilled chicken, prime beef suya, golden dodo & 2 House Zobos.',
    price: 14500,
    image: '/images/hero-feast.jpg',
    category: 'Combos',
    categories: ['Combos'],
  },
  {
    id: 'chapman-mocktail',
    name: 'Lagos Island Chapman',
    tag: 'Freshly made',
    tagType: 'fresh',
    description: 'Classic Nigerian mocktail with Angostura bitters, fresh cucumber, orange slices, and sprite.',
    price: 1800,
    image: '/images/menu-zobo.jpg',
    category: 'Drinks',
    categories: ['Drinks'],
  },
];

export const INITIAL_OUTLETS: Outlet[] = [
  {
    id: 'lekki-1',
    slug: 'lekki-phase-1',
    name: 'Lekki Phase 1',
    address: '12 Admiralty Way, Lekki, Lagos',
    area: 'Lekki / Victoria Island Corridor',
    distanceKm: 1.2,
    prepTime: '30–40 min',
    deliversToUser: true,
    isOpen: true,
    hours: 'Open until 10:00 PM',
    phone: '0800 2852 266',
    image: '/images/storefront.jpg',
    rating: 4.8,
    reviewCount: 240,
    deliveryFee: 1500,
    menu: CROWD_FAVOURITES,
  },
  {
    id: 'vi',
    slug: 'victoria-island',
    name: 'Victoria Island',
    address: '28 Akin Adesola Street, VI, Lagos',
    area: 'Victoria Island & Ikoyi',
    distanceKm: 6.8,
    prepTime: '40–50 min',
    deliversToUser: true,
    isOpen: true,
    hours: 'Open until 10:00 PM',
    phone: '0800 2852 267',
    image: '/images/interior.jpg',
    rating: 4.9,
    reviewCount: 310,
    deliveryFee: 1500,
    menu: CROWD_FAVOURITES,
  },
  {
    id: 'ikeja',
    slug: 'ikeja-gra',
    name: 'Ikeja GRA',
    address: '8 Isaac John Street, Ikeja, Lagos',
    area: 'Ikeja & Mainland Hub',
    distanceKm: 24.0,
    prepTime: 'Pickup only',
    deliversToUser: false,
    isOpen: true,
    hours: 'Open until 10:00 PM',
    phone: '0800 2852 268',
    image: '/images/storefront.jpg',
    rating: 4.7,
    reviewCount: 195,
    deliveryFee: 2000,
    menu: CROWD_FAVOURITES,
  },
  {
    id: 'yaba',
    slug: 'yaba',
    name: 'Yaba',
    address: '42 Herbert Macaulay Way, Yaba, Lagos',
    area: 'Yaba & Tech Corridor',
    distanceKm: 16.0,
    prepTime: 'Pickup only',
    deliversToUser: false,
    isOpen: true,
    hours: 'Open until 10:00 PM',
    phone: '0800 2852 269',
    image: '/images/interior.jpg',
    rating: 4.8,
    reviewCount: 220,
    deliveryFee: 1800,
    menu: CROWD_FAVOURITES,
  },
  {
    id: 'surulere',
    slug: 'surulere',
    name: 'Surulere',
    address: '16 Adeniran Ogunsanya Street, Lagos',
    area: 'Surulere & Environs',
    distanceKm: 19.0,
    prepTime: 'Pickup only',
    deliversToUser: false,
    isOpen: true,
    hours: 'Open until 10:00 PM',
    phone: '0800 2852 270',
    image: '/images/storefront.jpg',
    rating: 4.8,
    reviewCount: 180,
    deliveryFee: 1800,
    menu: CROWD_FAVOURITES,
  },
];

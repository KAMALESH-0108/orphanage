import { Orphanage, DonationCategory, Testimonial, Stat } from '../types';

export const ORPHANAGES: Orphanage[] = [
  {
    id: '1',
    name: 'Sunshine Children\'s Centre',
    location: 'Nairobi, Kenya',
    description: 'Providing shelter and education to over 50 children.',
    needs: ['Books', 'School Uniforms', 'Rice'],
    verified: true,
  },
  {
    id: '2',
    name: 'Hope Haven',
    location: 'Manila, Philippines',
    description: 'A safe space for street children to find hope and healing.',
    needs: ['Medical Supplies', 'Clothing', 'Toys'],
    verified: true,
  },
  {
    id: '3',
    name: 'St. Mary\'s Home',
    location: 'London, UK',
    description: 'Supporting foster care placements and emergency housing.',
    needs: ['Winter Coats', 'Funds', 'Volunteers'],
    verified: true,
  },
  {
    id: '4',
    name: 'Little Angels Organisation',
    location: 'Mumbai, India',
    description: 'Empowering orphans through vocational training.',
    needs: ['Computers', 'Stationery', 'Food'],
    verified: true,
  },
];

export const DONATION_CATEGORIES: DonationCategory[] = [
  {
    id: 'food',
    title: 'Food & Nutrition',
    description: 'Provide healthy meals for a day, week, or month.',
    iconName: 'Utensils',
    color: '#EA580C',
  },
  {
    id: 'clothes',
    title: 'Clothes & Warmth',
    description: 'New clothes and blankets for comfort and dignity.',
    iconName: 'Shirt',
    color: '#059669',
  },
  {
    id: 'toys',
    title: 'Toys & Education',
    description: 'Books, toys, and school supplies for growth.',
    iconName: 'Gamepad2',
    color: '#7C3AED',
  },
  {
    id: 'funds',
    title: 'General Funds',
    description: 'Support operational costs and emergency needs.',
    iconName: 'Banknote',
    color: '#2563EB',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'Seeing the joy on the children\'s faces when they received the new books was priceless. This platform makes it so easy to help.',
    author: 'Sarah Jenkins',
    role: 'Monthly Donor',
  },
  {
    id: '2',
    quote: 'Hope for Orphans helped us repair our roof before the rainy season. We are forever grateful for the support.',
    author: 'David Okonjo',
    role: 'Orphanage Director',
  },
  {
    id: '3',
    quote: 'I love that I can choose exactly where my money goes. Transparency is key for me, and this site delivers.',
    author: 'Michael Chen',
    role: 'Volunteer',
  },
];

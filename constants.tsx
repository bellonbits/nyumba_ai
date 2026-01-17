
import { Property, PropertyStatus, Lead, LeadStatus, ChatThread } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'PRP001',
    title: 'Modern 2BR Apartment',
    location: 'Ruaka, Kiambu',
    price: 45000,
    bedrooms: 2,
    type: 'Rent',
    status: PropertyStatus.AVAILABLE,
    imageUrl: 'https://picsum.photos/seed/ruaka1/600/400',
    tags: ['Gym', 'Borehole', 'Security']
  },
  {
    id: 'PRP002',
    title: 'Luxury 4BR Villa',
    location: 'Karen, Nairobi',
    price: 85000000,
    bedrooms: 4,
    type: 'Sale',
    status: PropertyStatus.AVAILABLE,
    imageUrl: 'https://picsum.photos/seed/karen1/600/400',
    tags: ['Pool', '1 Acre', 'DSQ']
  },
  {
    id: 'PRP003',
    title: 'Cozy 1BR Studio',
    location: 'Kileleshwa, Nairobi',
    price: 35000,
    bedrooms: 1,
    type: 'Rent',
    status: PropertyStatus.RESERVED,
    imageUrl: 'https://picsum.photos/seed/kile1/600/400',
    tags: ['Furnished', 'Lift']
  },
  {
    id: 'PRP004',
    title: 'Gated Community Plot',
    location: 'Kamulu, Machakos',
    price: 1500000,
    bedrooms: 0,
    type: 'Sale',
    status: PropertyStatus.AVAILABLE,
    imageUrl: 'https://picsum.photos/seed/machakos1/600/400',
    tags: ['Water', 'Electricity', 'Flat']
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'L001',
    name: 'Kelvin Omari',
    handle: '@komari',
    preferredArea: 'Westlands',
    budget: 'KSh 60k - 80k',
    status: LeadStatus.VIEWING_BOOKED,
    lastActive: '2 hours ago'
  },
  {
    id: 'L002',
    name: 'Sarah Mwangi',
    handle: '@sarah_m',
    preferredArea: 'Syokimau',
    budget: 'KSh 10M - 15M',
    status: LeadStatus.NEW,
    lastActive: '15 mins ago'
  },
  {
    id: 'L003',
    name: 'John Doe',
    handle: '@jdoe_ke',
    preferredArea: 'Kiambu Road',
    budget: 'KSh 50k',
    status: LeadStatus.CONTACTED,
    lastActive: '1 day ago'
  },
  {
    id: 'L004',
    name: 'Anita B.',
    handle: '@anita_real',
    preferredArea: 'Mombasa Road',
    budget: 'KSh 5M',
    status: LeadStatus.CLOSED,
    lastActive: '3 days ago'
  }
];

export const MOCK_CHATS: ChatThread[] = [
  {
    id: 'C1',
    userName: 'Kelvin Omari',
    lastMessage: 'I would like to view the Ruaka property tomorrow.',
    time: '14:20',
    messages: [
      { id: 'm1', sender: 'user', text: 'Hi, I am looking for a 2 bedroom in Ruaka.', timestamp: '14:05' },
      { id: 'm2', sender: 'ai', text: 'Hello Kelvin! I found 3 properties in Ruaka that match your profile. Would you like to see photos?', timestamp: '14:06' },
      { id: 'm3', sender: 'user', text: 'Yes please.', timestamp: '14:10' },
      { id: 'm4', sender: 'ai', text: '[Photos Sent] The first one is KSh 45,000 per month.', timestamp: '14:11' },
      { id: 'm5', sender: 'user', text: 'I would like to view the Ruaka property tomorrow.', timestamp: '14:20' },
    ]
  },
  {
    id: 'C2',
    userName: 'Sarah Mwangi',
    lastMessage: 'What is the payment plan for the plots in Machakos?',
    time: '09:45',
    messages: [
      { id: 'm1', sender: 'user', text: 'Interested in Machakos plots.', timestamp: '09:40' },
      { id: 'm2', sender: 'ai', text: 'Great choice! We have 1/8 acre plots starting from 1.5M. What is your budget?', timestamp: '09:41' },
    ]
  }
];

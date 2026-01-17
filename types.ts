
export enum PropertyStatus {
  AVAILABLE = 'Available',
  RESERVED = 'Reserved',
  SOLD = 'Sold'
}

export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  VIEWING_BOOKED = 'Viewing Booked',
  CLOSED = 'Closed'
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  type: 'Rent' | 'Sale';
  status: PropertyStatus;
  imageUrl: string;
  tags: string[];
}

export interface Lead {
  id: string;
  name: string;
  handle: string;
  preferredArea: string;
  budget: string;
  status: LeadStatus;
  lastActive: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  userName: string;
  lastMessage: string;
  time: string;
  messages: Message[];
}

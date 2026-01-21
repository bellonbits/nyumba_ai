export interface Property {
    id: string;
    title: string;
    location: string;
    price: number;
    bedrooms: number;
    type: 'Sale' | 'Rent';
    status: 'Available' | 'Reserved' | 'Sold';
    description: string;
    features: string[];
    images: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
}

import { KENYA_PROPERTIES } from './kenya_properties';

export const PROPERTIES: Property[] = KENYA_PROPERTIES as unknown as Property[];

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

export const PROPERTIES: Property[] = [
    {
        id: 'RUAKA-2BR-045',
        title: 'Modern 2BR Apartment in Ruaka',
        location: 'Ruaka, Kiambu',
        price: 45000,
        bedrooms: 2,
        type: 'Rent',
        status: 'Available',
        description: 'A spacious 2 bedroom apartment located 5 minutes from Two Rivers Mall. Features a master ensuite, open plan kitchen, and high-speed lifts.',
        features: ['Master Ensuite', 'Borehole', 'Lift', 'Parking', 'CCTV', 'Gym'],
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
        ],
        coordinates: { lat: -1.1996, lng: 36.7766 }
    },
    {
        id: 'SYOKI-3BR-085',
        title: 'Luxury 3BR Bungalow in Syokimau',
        location: 'Syokimau, Machakos',
        price: 85000,
        bedrooms: 3,
        type: 'Rent',
        status: 'Available',
        description: 'Standalone bungalow in a gated community. Perfect for families. Includes a DSQ and private garden.',
        features: ['Gated Community', 'DSQ', 'Garden', 'Solar Heating', 'Kids Play Area'],
        images: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80'
        ],
        coordinates: { lat: -1.3533, lng: 36.9366 }
    },
    {
        id: 'WST-OFF-200',
        title: 'Premium Office Space in Westlands',
        location: 'Westlands, Nairobi',
        price: 200000,
        bedrooms: 0,
        type: 'Rent',
        status: 'Available',
        description: '2000 sq ft office space on the 15th floor with panoramic views of Nairobi. Backup generator and fiber ready.',
        features: ['Partitioned', 'High Speed Lifts', 'Backup Generator', 'Fiber Ready', 'Kitchenette'],
        images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&w=800&q=80'
        ],
        coordinates: { lat: -1.2673, lng: 36.8021 }
    },
    {
        id: 'KIL-1BR-060',
        title: 'Cozy 1BR Apartment in Kilimani',
        location: 'Kilimani, Nairobi',
        price: 60000,
        bedrooms: 1,
        type: 'Rent',
        status: 'Reserved',
        description: 'Stylish 1 bedroom apartment near Yaya Center. Fully furnished options available. Ideal for expatriates.',
        features: ['Swimming Pool', 'Gym', 'Full Backup Generator', 'Balcony', 'Intercom'],
        images: [
            'https://images.unsplash.com/photo-1522771753035-484980f830d8?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1502005229766-93976a1773ab?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80'
        ],
        coordinates: { lat: -1.2889, lng: 36.7876 }
    },
    {
        id: 'KAREN-5BR-SALE',
        title: 'Palatial 5BR Villa in Karen',
        location: 'Karen, Nairobi',
        price: 85000000,
        bedrooms: 5,
        type: 'Sale',
        status: 'Available',
        description: 'Exquisite 5 bedroom villa on 0.5 acres. Features a private pool, mature garden, and high-end finishes.',
        features: ['Private Pool', '0.5 Acres', 'all-ensuite', 'Fireplace', 'Gazebo', 'DSQ x 2'],
        images: [
            'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
        ],
        coordinates: { lat: -1.3204, lng: 36.7085 }
    },
    {
        id: 'KIT-PLOT-SALE',
        title: '50x100 Plot in Kitengela',
        location: 'Kitengela, Kajiado',
        price: 1500000,
        bedrooms: 0,
        type: 'Sale',
        status: 'Available',
        description: 'Prime residential plot 2km from Kitengela town. Ready title deed. Water and electricity on site.',
        features: ['Ready Title', 'Fenced', 'Water on site', 'Electricity on site'],
        images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1464295440335-ee082a75ccca?auto=format&fit=crop&w=800&q=80'
        ],
        coordinates: { lat: -1.5033, lng: 36.9602 }
    }
];


import { Property, Lead, PropertyStatus, LeadStatus } from '../types';

// Implementation of the tools requested by the user

export interface FAQ {
    id: number;
    question: string;
    answer: string;
    tags: string[];
}

export interface Interaction {
    id: string;
    timestamp: string;
    userId: string;
    type: 'viewing_request' | 'booking' | 'inquiry' | 'search';
    details: any;
}

import { PROPERTIES } from '../data/properties';

// Transform imported data to match internal schema if necessary, or just use it.
// We map it to ensure compatibility with existing filtering logic which expects 'price_kes' etc.
let properties: any[] = PROPERTIES.map(p => ({
    ...p,
    price_kes: p.price,
    for_sale_or_rent: p.type === 'Rent' ? 'rent' : 'sale',
    property_type: p.title.toLowerCase().includes('plot') ? 'plot' : p.title.toLowerCase().includes('office') ? 'commercial' : p.title.toLowerCase().includes('villa') || p.title.toLowerCase().includes('bungalow') ? 'house' : 'apartment',
    size_sqft: 1200,
    is_negotiable: true,
    // ensure images is an array
    images: p.images || []
}));

let faqs: FAQ[] = [
    {
        id: 1,
        question: 'What documents do I need to rent a house in Kenya?',
        answer: 'Typically you will need a copy of your ID, one or two months deposit, the first month rent, and sometimes a work contract or proof of income. Requirements can vary by landlord or property.',
        tags: ['rent', 'documents', 'requirements']
    },
    {
        id: 2,
        question: 'How much is the deposit for rental properties?',
        answer: 'Most landlords in Kenya ask for one or two months rent as a deposit. Some serviced apartments may also ask for a utilities or service deposit.',
        tags: ['rent', 'deposit']
    },
    {
        id: 3,
        question: 'Do your prices include service charge?',
        answer: 'Some apartments include service charge in the listed rent, while others charge it separately. Please ask about a specific property and we will confirm from the listing details.',
        tags: ['rent', 'service charge']
    },
    {
        id: 4,
        question: 'How do I book a viewing?',
        answer: 'Once you choose a property you like, we confirm its availability, then schedule a viewing date and time that works for you. A field agent will meet you at the property or a common pickup point.',
        tags: ['viewing', 'booking']
    },
    {
        id: 5,
        question: 'Can I pay rent via M-Pesa?',
        answer: 'Yes, many landlords and property managers accept rent via M-Pesa Paybill or Till Number. We will share the official payment details once you confirm a property.',
        tags: ['rent', 'payments', 'mpesa']
    },
    {
        id: 6,
        question: 'Do your plots have title deeds?',
        answer: 'For each plot, we indicate the status of the title (freehold, leasehold, or in process). Before purchase, the buyer is encouraged to conduct a title search at the relevant land registry with assistance from a lawyer.',
        tags: ['plots', 'title', 'legal']
    },
    {
        id: 7,
        question: 'Do you assist with mortgages?',
        answer: 'We can refer you to partner banks and mortgage providers who can assess your eligibility and guide you through the financing process.',
        tags: ['mortgage', 'financing']
    },
    {
        id: 8,
        question: 'Are your prices negotiable?',
        answer: 'Most prices are slightly negotiable depending on demand, payment plan, and how fast you are able to commit. For any specific property, we can check with the seller or landlord on the negotiation room.',
        tags: ['price', 'negotiation']
    }
];

export interface ChatMessage {
    id: string;
    userId: string;
    sender: 'user' | 'assistant' | 'system';
    text: string;
    timestamp: string;
}

let leads: any[] = [];
let interactions: Interaction[] = [];
let messages: ChatMessage[] = [];

// --- Persistence Layer ---
// --- Persistence Layer ---
const isNode = typeof process !== 'undefined' && process.release?.name === 'node';

let fs: any;
let path: any;
let persistenceReady = false;

const init_persistence = async () => {
    if (isNode && !persistenceReady) {
        try {
            const fsModule = await import('fs');
            const pathModule = await import('path');
            fs = fsModule.default || fsModule;
            path = pathModule.default || pathModule;

            const file = path.join(process.cwd(), 'data', 'storage.json');
            if (fs.existsSync(file)) {
                const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
                leads = data.leads || [];
                interactions = data.interactions || [];
                messages = data.messages || [];
                console.log('Database loaded (Node).');
            }
            persistenceReady = true;
        } catch (e) {
            console.error('Persistence Init Error:', e);
        }
    } else if (!isNode) {
        try {
            const data = localStorage.getItem('nyumba_db');
            if (data) {
                const parsed = JSON.parse(data);
                leads = parsed.leads || [];
                interactions = parsed.interactions || [];
                messages = parsed.messages || [];
                console.log('Database loaded (Browser).');
            }
        } catch (e) { }
    }
};

// Fire and forget init, or allow awaiting it (better)
init_persistence();

const save_db = async () => {
    if (isNode) {
        if (!fs) await init_persistence();
        try {
            const file = path.join(process.cwd(), 'data', 'storage.json');
            if (!fs.existsSync(path.dirname(file))) fs.mkdirSync(path.dirname(file), { recursive: true });
            fs.writeFileSync(file, JSON.stringify({ leads, interactions, messages }, null, 2));
        } catch (e) {
            console.error('DB Save Error:', e);
        }
    } else {
        try {
            localStorage.setItem('nyumba_db', JSON.stringify({ leads, interactions, messages }));
        } catch (e) { }
    }
};


// --- Services ---

export const db_search_properties = (filters: {
    location?: string;
    price_min?: number;
    price_max?: number;
    bedrooms?: number;
    property_type?: string;
    for_sale_or_rent?: string;
}) => {
    return properties.filter(p => {
        if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
        if (filters.price_min && p.price_kes < filters.price_min) return false;
        if (filters.price_max && p.price_kes > filters.price_max) return false;
        if (filters.bedrooms !== undefined && filters.bedrooms !== null && p.bedrooms !== filters.bedrooms) return false;
        if (filters.property_type && p.property_type !== filters.property_type) return false;
        if (filters.for_sale_or_rent && p.for_sale_or_rent !== filters.for_sale_or_rent) return false;
        return true;
    });
};

export const db_get_property_by_id = (property_id: string) => {
    return properties.find(p => p.id === property_id);
};

export const db_save_lead = async (lead_data: any) => {
    // Check if lead already exists
    const existing = leads.find(l => l.name === lead_data.name || l.contact === lead_data.contact);
    if (existing) {
        Object.assign(existing, { ...lead_data, lastActive: new Date().toISOString() });
        await save_db();
        return existing;
    }
    const newLead = {
        ...lead_data,
        id: `L${Date.now()}`,
        created_at: new Date().toISOString(),
        lastActive: new Date().toISOString()
    };
    leads.push(newLead);
    await save_db();
    return newLead;
};

export const db_list_faqs = () => {
    return faqs;
};

export const db_get_faq_by_keyword = (keyword: string) => {
    return faqs.filter(f =>
        f.question.toLowerCase().includes(keyword.toLowerCase()) ||
        f.tags.some(t => t.toLowerCase().includes(keyword.toLowerCase()))
    );
};

export const db_log_interaction = async (interaction_data: any) => {
    const newInteraction: Interaction = {
        ...interaction_data,
        id: `INT${Date.now()}`,
        timestamp: new Date().toISOString()
    };
    interactions.push(newInteraction);
    await save_db();
    return newInteraction;
};

export const db_save_message = async (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMsg = { ...msg, id: `MSG${Date.now()}-${Math.random()}`, timestamp: new Date().toISOString() };
    messages.push(newMsg);
    await save_db();
    return newMsg;
};

export const db_get_messages_by_user = (userId: string) => messages.filter(m => m.userId === userId);
export const db_get_all_messages = () => messages;

export const db_get_all_properties = () => properties;
export const db_get_all_leads = () => leads;
export const db_get_all_interactions = () => interactions;

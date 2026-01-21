
import * as db from './database';

interface SearchResult {
    property: any;
    score: number;
}

/**
 * A lightweight RAG implementation that scores properties based on semantic keyword overlap.
 * This simulates vector search without needing an external embedding database for the MVP.
 */
export class RagService {

    /**
     * Search for properties relevant to the user's query.
     * @param query The user's input text
     * @param limit Max number of results to return
     */
    static searchProperties(query: string, limit: number = 5): SearchResult[] {
        const properties = db.db_get_all_properties();
        const normalizedQuery = query.toLowerCase();

        // Split query into significant keywords
        const stopWords = ['i', 'want', 'looking', 'for', 'a', 'in', 'near', 'the', 'with', 'and', 'or', 'is', 'at', 'to', 'can', 'you', 'show', 'me', 'please'];
        const keywords = normalizedQuery.split(/\W+/).filter(w => w.length > 2 && !stopWords.includes(w));

        // If no keywords (e.g. "Hi"), return random featured
        if (keywords.length === 0) return [];

        const scored = properties.map(prop => {
            let score = 0;
            const fullText = [
                prop.title,
                prop.location,
                prop.type,
                prop.description,
                prop.features.join(' '),
                ...(prop.tags || [])
            ].join(' ').toLowerCase();

            keywords.forEach(kw => {
                // Exact match
                if (fullText.includes(kw)) {
                    score += 1;
                    // Boost location/type matches
                    if (prop.location.toLowerCase().includes(kw)) score += 3;
                    if (prop.type?.toLowerCase().includes(kw)) score += 2;
                }
                // Fuzzy/Partial match (e.g. "Westy" -> "Westlands")
                else if (prop.location.toLowerCase().startsWith(kw.slice(0, 4))) {
                    score += 2;
                }
            });

            // Budget Match Logic
            const numbers = query.match(/\d+/g);
            if (numbers) {
                const targetPrice = parseInt(numbers.join(''));
                const price = prop.price || prop.price_kes || 0;
                if (targetPrice > 5000 && price > 0) { // Assume >5000 is a price, not e.g. "2 beds"
                    const diff = Math.abs(price - targetPrice);
                    if (diff <= (price * 0.25)) score += 5; // Within 25% range
                }
            }

            return { property: prop, score };
        });

        return scored
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    /**
     * Generates a context string for the AI.
     * Guaranteed to return properties (Found or Featured).
     */
    static getContext(query: string): string {
        let results = this.searchProperties(query);
        let prefix = "Following properties matched the user's query:\n";

        // Fallback: If no results, get 3 random featured ones
        if (results.length === 0) {
            const allProps = db.db_get_all_properties();
            // Simple shuffle
            const randomProps = allProps.sort(() => 0.5 - Math.random()).slice(0, 3);
            results = randomProps.map(p => ({ property: p, score: 1 }));
            prefix = "No exact matches found. Recommend these FEATURED properties instead:\n";
        }

        const context = results.map(r => {
            const p = r.property;
            return `[PROPERTY_CARD]
ID: ${p.id}
Title: ${p.title}
Location: ${p.location}
Price: KES ${(p.price || p.price_kes).toLocaleString()}
Type: ${p.type || p.for_sale_or_rent}
Bedrooms: ${p.bedrooms}
Features: ${p.features.join(', ')}
Images: ${p.images?.[0] || 'No Image'}
-------------------`;
        }).join('\n');

        return `${prefix}${context}`;
    }
}

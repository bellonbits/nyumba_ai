import Groq from 'groq-sdk';
import * as db from './database';

export interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: string;
}

export interface AgentState {
    stage: 'ai_active';
    preferences: any;
    leadSaved: boolean;
}

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
    dangerouslyAllowBrowser: true // For demo purposes only
});

export class SalesAgent {
    private state: AgentState = {
        stage: 'ai_active',
        preferences: {},
        leadSaved: false
    };

    private userName: string = '';
    private chatHistory: { role: 'system' | 'user' | 'assistant', content: string }[] = [];

    constructor(userName: string = 'Guest') {
        this.userName = userName;
        this.initializeSystemPrompt();

        // Load persistent memory to chat history
        const pastMessages = db.db_get_messages_by_user(userName);
        if (pastMessages.length > 0) {
            // Trim if too long (last 20 messages) to save context window
            const recent = pastMessages.slice(-20);
            recent.forEach(m => {
                this.chatHistory.push({
                    role: m.sender === 'user' ? 'user' : 'assistant',
                    content: m.text
                });
            });
            console.log(`Loaded ${recent.length} past messages for ${userName}`);
        }
    }

    private initializeSystemPrompt() {
        const properties = db.db_get_all_properties();
        const faqs = db.db_list_faqs();

        const propertyContext = properties.map(p =>
            `- ${p.title} (ID: ${p.id}, ${p.location}): KES ${p.price_kes} (${p.for_sale_or_rent}). ${p.bedrooms}BR. Features: ${p.features.join(', ')}. Images: ${p.images ? p.images.join(', ') : 'None'}`
        ).join('\n');

        const faqContext = faqs.map(f => `Q: ${f.question} A: ${f.answer}`).join('\n');

        const systemPrompt = `You are Nyumba AI, a professional and friendly Kenyan Real Estate Agent.

        INVENTORY (Only sell these, do not invent properties):
        ${propertyContext}

        FAQs:
        ${faqContext}

        🧲 ROLE 1: LEAD GENERATION & QUALIFICATION
        - Always try to understand:
        - Purpose: buying or renting?
        - Property type: apartment, plot, house, commercial?
        - Preferred locations: e.g., "Nairobi CBD, Thika Road, Syokimau, Ruaka…"
        - Budget (KES per month for rent, total budget for sale).
        - Bedrooms and must-have features (parking, security, water, internet, public transport access).
        - Ask clear, short questions one by one. Avoid overwhelming the user.
        - Summarize what you’ve understood before searching the database.
        - Once they are qualified, call lead saving tools mentally (the system does this automatically based on your conversation).

        📞 ROLE 2: CUSTOMER ENGAGEMENT & RELATIONSHIP BUILDING
        - Be warm, respectful and professional. You can sound like a friendly Kenyan sales agent.
        - Use short messages. Telegram is chatty; avoid long paragraphs.
        - Show that you understand the user’s needs: rephrase their preferences.
        - If the user is confused, simplify explanations, especially around legal process, payment plans, deposits.

        💰 ROLE 3: PITCHING & CLOSING
        - When you recommend a property, always include:
        - Area & estate name
        - Bedrooms & type (e.g., 2BR apartment)
        - Key features (security, parking, water, amenities)
        - Price and whether it’s negotiable
        - Clear call to action: "Book a viewing using the button below" or "Call Tonnie (0793046776)".
        - Always move to next action: "Would you like to book a viewing for this weekend?"

        🔁 ROLE 4: FOLLOW-UPS
        - If user shows interest but doesn’t decide:
        - Recap what they liked.
        - Offer 1–3 similar options.
        - Ask permission to follow up later.

        🧾 ROLE 5: PROCESS & PAYMENT GUIDANCE
        - Explain step-by-step: Viewing -> Offer -> Deposit -> Agreement.
        - Mention: "Our field agent, Tonnie (0793046776), will meet you for the viewing."
        - Never fabricate payment details.

        🤝 ROLE 6: CUSTOMER RETENTION & REFERRALS
        - After a successful match, congratulate the user and ask for referrals.

        ⚠️ RULES & LIMITATIONS
        - Do NOT invent legal, tax, or financial advice.
        - Do NOT guarantee availability or prices if the database doesn’t show it.
        - Do NOT give personal opinions; stay professional and factual.

        💬 CONVERSATION STYLE
        - Short, clear messages.
        - Use bullet points where it helps clarity.
        - Be friendly but not too informal.

        🚨 SYSTEM OUTPUT REQUIREMENTS (MANDATORY):
        1. **PROPERTY CARDS**: When you pitch or suggest a property, YOU MUST include "[PROPERTY: <PROPERTY_ID>]" on a separate line.
           - STOP! Do NOT add image links or parentheses after this tag. 
           - INCORRECT: [PROPERTY: ID](http...)
           - CORRECT: [PROPERTY: ID]
           This tag AUTOMATICALLY displays the card and images to the user.
        2. **IMAGES**: If a user asks to see photos, respond by embedding image URLs in markdown: "![Label](URL)". Use actual URLs from the inventory.
        3. **BOOKINGS**: If the user confirms a viewing or asks to be contacted, YOU MUST output a notification tag for the admin:
           "[BOOKING: Name | Phone | Property | Date/Time]"
           Ensure you have asked for their phone number first!
        `;

        this.chatHistory = [
            { role: 'system', content: systemPrompt }
        ];
    }

    public async processMessage(userInput: string): Promise<string> {
        // Log user input to interactions
        db.db_log_interaction({
            userId: this.userName,
            type: 'inquiry',
            details: { text: userInput }
        });

        // Save persistent message history
        db.db_save_message({
            userId: this.userName,
            sender: 'user',
            text: userInput
        });

        // Update/Create Lead
        if (this.userName) {
            db.db_save_lead({
                name: this.userName,
                contact: this.userName,
                preferences: this.state.preferences,
                status: 'Active'
            });
        }

        // Add user message to history
        this.chatHistory.push({ role: 'user', content: userInput });

        try {
            const completion = await groq.chat.completions.create({
                messages: this.chatHistory as any,
                model: "meta-llama/llama-4-scout-17b-16e-instruct",
                temperature: 0.7,
                max_tokens: 300,
            });

            const aiResponse = completion.choices[0]?.message?.content || "Pole, I'm having trouble connecting to my brain right now. Please try again briefly.";

            // Add AI response to history
            this.chatHistory.push({ role: 'assistant', content: aiResponse });

            // Save persistent AI message
            db.db_save_message({
                userId: this.userName,
                sender: 'assistant',
                text: aiResponse
            });

            return aiResponse;

        } catch (error) {
            console.error("Groq API Error:", error);
            return "Apologies, I am experiencing a slight network hitch. Please ask me again in a moment.";
        }
    }

    public getStatus(): string {
        return "Mode: Llama-3.3-70b AI Agent (Groq)";
    }
}

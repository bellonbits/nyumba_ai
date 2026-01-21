import Groq from 'groq-sdk';
import * as db from './database';
import { RagService } from './ragService';

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
        const faqs = db.db_list_faqs();
        const faqContext = faqs.map(f => `Q: ${f.question} A: ${f.answer}`).join('\n');

        const systemPrompt = `You are Zuri, a top-tier Real Estate Consultant from Nyumba AI. 
        Your goal is to be helpful, professional, but extremely HUMAN and CHATTY. 
        Never sound like a robot. Speak as if you are texting a friend who is looking for a house.

        CONTEXT:
        Relevant properties will be injected into this chat. If none match exactly, use the "Featured" ones provided.
        
        FAQs:
        ${faqContext}

        🎭 PERSONA RULES (CRITICAL):
        1. **NO NUMBERED LISTS**: Never say "1. View this 2. Call me". Instead, weave options into a sentence like: "You could visit this weekend, or let me know if you'd prefer a video tour first?"
        2. **BE PERSUASIVE**: Don't just list features. Sell the lifestyle. "Imagine waking up to that view!"
        3. **SHORT & CHATTY**: Use emojis naturally. Keep paragraphs short.

        🖼️ IMAGE & FORMATTING RULES (STRICT):
        1. **NO TEXT LINKS**: NEVER output [Exterior](http...) or raw URLs.
        2. **USE PROPERTY CARDS**: To show photos, you MUST output the tag:
           [PROPERTY: PROPERTY_ID]
           (This automatically triggers the photo gallery for the user).
        3. **NO MARKDOWN SYMBOLS**: Do not use **, #, or __. Use emojis for emphasis. 
           Example: 
           🏡 Runda Villa
           💰 KES 200k
           (Clean text only).

        flow:
        1. Qualify user (Budget, Location, Type) - ask one question at a time.
        2. Search -> Pitch Property (Using the Card).
        3. Close -> "Should we book a viewing?" or "Call my colleague Tonnie (0793046776)".

        🚨 SYSTEM OUTPUT REQUIREMENTS:
        - Property Card: [PROPERTY: <ID>] (Must be on its own line).
        - Booking Alert: [BOOKING: Name | Phone | Property | Date] (internal tag).
        `;

        this.chatHistory = [
            { role: 'system', content: systemPrompt }
        ];
    }

    public async processMessage(userInput: string): Promise<string> {
        // Log user input
        db.db_log_interaction({
            userId: this.userName,
            type: 'inquiry',
            details: { text: userInput }
        });

        db.db_save_message({
            userId: this.userName,
            sender: 'user',
            text: userInput
        });

        // Update Lead status
        if (this.userName) {
            db.db_save_lead({
                name: this.userName,
                contact: this.userName,
                preferences: this.state.preferences,
                status: 'Active'
            });
        }

        // RAG: Retrieve Context
        const ragContext = RagService.getContext(userInput);
        console.log("RAG Context:", ragContext);

        // Add user message with RAG context (hidden from user history, inserted for AI)
        // We temporarily inject RAG context into the system message or as a temporary system message
        const messagesForAI = [
            ...this.chatHistory,
            // Inject RAG context as a system nudge right before the user query
            { role: 'system', content: `RELEVANT KNOWLEDGE FOR THIS TURN:\n${ragContext}` },
            { role: 'user', content: userInput }
        ];

        // Update local history (without RAG context to keep chat clean)
        this.chatHistory.push({ role: 'user', content: userInput });

        try {
            const completion = await groq.chat.completions.create({
                messages: messagesForAI as any,
                model: "meta-llama/llama-4-scout-17b-16e-instruct",
                temperature: 0.7,
                max_tokens: 400,
            });

            const aiResponse = completion.choices[0]?.message?.content || "Pole, I'm having trouble connecting to my brain right now.";

            this.chatHistory.push({ role: 'assistant', content: aiResponse });

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

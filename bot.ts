import 'dotenv/config'; // Must be first
import TelegramBot from 'node-telegram-bot-api';
import { SalesAgent } from './services/salesAgent';
import * as db from './services/database';

// Environment variables are now loaded

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    console.error('CRITICAL ERROR: TELEGRAM_BOT_TOKEN is missing in .env.local');
    process.exit(1);
}

console.log('Starting Nyumba AI Telegram Bot...');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Store active agents for each user
// Map<ChatId, SalesAgent>
const activeAgents = new Map<number, SalesAgent>();

// Handle text messages
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const userName = msg.from?.first_name || 'Guest';

    if (!text) return;

    // Initialize agent if not exists
    if (!activeAgents.has(chatId)) {
        console.log(`New session started for user: ${userName} (${chatId})`);
        const newAgent = new SalesAgent(userName);
        activeAgents.set(chatId, newAgent);
    }

    const agent = activeAgents.get(chatId)!;

    // Simulate "typing" action for realism
    bot.sendChatAction(chatId, 'typing');

    try {
        // Process message through our core AI logic
        const response = await agent.processMessage(text);

        // Process response for RICH MEDIA
        let cleanText = response;
        const imagesToSend: { url: string; caption: string }[] = [];
        const propertiesToSend: string[] = [];

        // 1. Extract Images: ![alt](url)
        const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
        let imgMatch;
        while ((imgMatch = imageRegex.exec(response)) !== null) {
            imagesToSend.push({ url: imgMatch[2], caption: imgMatch[1] });
            cleanText = cleanText.replace(imgMatch[0], ''); // Remove from text
        }

        // 2. Extract Properties: [PROPERTY:ID]
        const propertyRegex = /\[PROPERTY:\s*([^\]"']+)\]/g;
        let propMatch;
        while ((propMatch = propertyRegex.exec(response)) !== null) {
            propertiesToSend.push(propMatch[1].trim());
            cleanText = cleanText.replace(propMatch[0], '');
        }

        // 3. Extract Booking Notifications: [BOOKING: ...]
        const bookingRegex = /\[BOOKING:\s*([^\]]+)\]/g;
        let bookingMatch;
        while ((bookingMatch = bookingRegex.exec(response)) !== null) {
            const bookingDetails = bookingMatch[1].trim();
            cleanText = cleanText.replace(bookingMatch[0], ''); // Remove from user text

            // Notify Admin
            const adminId = process.env.ADMIN_CHAT_ID;
            if (adminId) {
                const adminMsg = `🚀 **New Lead Alert** 🚀\n\n${bookingDetails}\n\n👤 **Contact**: @${msg.from?.username || 'N/A'}`;
                bot.sendMessage(adminId, adminMsg, { parse_mode: 'Markdown' });
            } else {
                console.log("Booking captured but ADMIN_CHAT_ID not set:", bookingDetails);
            }
        }

        // Clean up extra whitespace/newlines
        cleanText = cleanText.replace(/\n\s*\n/g, '\n').trim();

        // Step 1: Send Text
        if (cleanText) {
            await bot.sendMessage(chatId, cleanText);
        }

        // Step 2: Send Images (Pop ups)
        for (const img of imagesToSend) {
            try {
                await bot.sendChatAction(chatId, 'upload_photo');
                await bot.sendPhoto(chatId, img.url, { caption: img.caption });
            } catch (e) {
                console.error("Failed to send image:", img.url);
            }
        }

        // Step 3: Send Property Cards (Professional Tags)
        for (const propId of propertiesToSend) {
            const p = db.db_get_property_by_id(propId);
            if (p) {
                await bot.sendChatAction(chatId, 'upload_photo');
                const caption = `🏡 *${p.title}*\n\n📍 ${p.location}\n💰 *KES ${(p.price || p.price_kes).toLocaleString()}* (${p.type || p.for_sale_or_rent})\n🛏️ ${p.bedrooms} Bedrooms\n\n✨ _${p.features?.slice(0, 3).join(', ')}_\n\n[View Full Details](https://nyumba.ai/property/${p.id})`;

                // Use first image or placeholder
                const imageUrl = p.images?.[0] || p.imageUrl || "https://via.placeholder.com/800x600.png?text=No+Image";

                try {
                    await bot.sendPhoto(chatId, imageUrl, {
                        caption: caption,
                        parse_mode: 'Markdown'
                    });
                } catch (e) {
                    console.error("Failed to send property card:", propId);
                }
            }
        }

        // Log status for debugging
        console.log(`[${userName}]: ${text}`);
        console.log(`[AI]: ${response}`);

    } catch (error) {
        console.error('Error processing message:', error);
        bot.sendMessage(chatId, "Pole sana! I am having some trouble connected to the server. Please try again later.");
    }
});

console.log('Bot is now polling for messages. Press Ctrl+C to stop.');

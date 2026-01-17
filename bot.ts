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

import { handleBotMessage } from './services/botLogic';

// Handle text messages
bot.on('message', async (msg) => {
    await handleBotMessage(bot, msg);
});

console.log('Bot is now polling for messages. Press Ctrl+C to stop.');

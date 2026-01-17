
import type { VercelRequest, VercelResponse } from '@vercel/node';
import TelegramBot from 'node-telegram-bot-api';
import { handleBotMessage } from '../services/botLogic';

const token = process.env.TELEGRAM_BOT_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!token) {
        return res.status(500).json({ error: 'TELEGRAM_BOT_TOKEN not configured' });
    }

    // Initialize bot without polling
    const bot = new TelegramBot(token, { polling: false });

    if (req.method === 'POST') {
        const update = req.body;

        if (update.message) {
            // Process the message using our shared logic
            await handleBotMessage(bot, update.message);
        }

        return res.status(200).json({ ok: true });
    }

    return res.status(200).json({ status: 'Nyumba AI Bot Webhook is Active' });
}

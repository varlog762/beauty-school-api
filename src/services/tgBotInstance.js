import dotenv from 'dotenv';
import TgBot from './TgBot.js';

dotenv.config();

const telegramToken = process.env.TG_BOT_TOKEN;
const telegramSecret = process.env.TG_SECRET;

const tgBot = new TgBot(telegramToken, telegramSecret);
tgBot.startListenMessages();

export default tgBot;

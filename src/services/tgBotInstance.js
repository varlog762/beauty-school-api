import dotenv from 'dotenv';
import TgBot from './TgBot.js';

dotenv.config();

const telegramToken = process.env.TG_BOT_TOKEN;
const tgBot = new TgBot(telegramToken);
tgBot.startListenMessages();

export default tgBot;

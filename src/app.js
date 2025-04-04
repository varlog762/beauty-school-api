import dotenv from 'dotenv';
import express from 'express';
import registerRouter from './routes/register.js';
import TgBot from './services/TgBot.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const telegramToken = process.env.TG_BOT_TOKEN;
export const tgBot = new TgBot(telegramToken);
tgBot.startListenMessages();

app.use(express.json());

app.use('/register', registerRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

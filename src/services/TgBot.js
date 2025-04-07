import TelegramBot from 'node-telegram-bot-api';
import db from '../db/database.js';

class TgBot {
  constructor(telegramToken, telegramSecret) {
    this.bot = new TelegramBot(telegramToken, { polling: true });
    this.secret = telegramSecret;
    this.chatList = new Set();
    this.loadChatIdsFromDB();
    console.log('Telegram-bot created successfully!');
  }

  loadChatIdsFromDB() {
    const rows = db.prepare('SELECT chat_id FROM chats').all();
    rows.forEach(row => this.chatList.add(row.chat_id));
    console.log('Loaded chat IDs from DB:');
    this.showAllChats();
  }

  startListenMessages() {
    this.bot.on('message', msg => {
      const chatId = msg.chat?.id;
      const message = msg.text?.trim();

      if (message === '/start') {
        this.bot.sendMessage(chatId, 'Введите секретную фразу для доступа:');
      }

      if (
        message !== '/start' &&
        !this.chatList.has(chatId) &&
        message === this.secret
      ) {
        try {
          db.prepare('INSERT INTO chats (chat_id) VALUES (?)').run(
            String(chatId)
          );
          this.chatList.add(chatId);
          this.bot.sendMessage(
            chatId,
            '✅ Вы зарегистрированы как администратор.'
          );
        } catch (err) {
          console.error('Ошибка добавления chat_id:', err.message);
          this.bot.sendMessage(
            chatId,
            'Упс! Произошла ошибка, попробуйте позже...'
          );
        }
      } else if (message !== '/start' && !this.chatList.has(chatId)) {
        this.bot.sendMessage(chatId, '❌ Неверная секретная фраза.');
      }
    });
  }

  async sendToAll(message) {
    try {
      this.chatList.forEach(
        async chatId => await this.bot.sendMessage(chatId, message)
      );
    } catch (error) {
      console.error(error?.message ?? error);
    }
  }

  async sendMessage(chatId, message) {
    await this.bot.sendMessage(chatId, message);
  }

  showAllChats() {
    console.log(Array.from(this.chatList).toString() || 'Chat list is empty!');
  }
}

export default TgBot;

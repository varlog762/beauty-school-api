import TelegramBot from 'node-telegram-bot-api';
import { getAllChatIdsFromDB, addChatIdToDB } from '../models/chat.js';

class TgBot {
  constructor(telegramToken, telegramSecret) {
    this.bot = new TelegramBot(telegramToken, { polling: true });
    this.secret = telegramSecret;
    this.chatList = this.loadChatIdsFromDB();
    console.log('Telegram-bot created successfully!');
  }

  loadChatIdsFromDB() {
    const rows = getAllChatIdsFromDB();
    console.log(
      rows.length ? 'Chat IDs loaded from DB!' : 'Chats DB is empty!'
    );

    return rows ? new Set(rows.map(item => item.chat_id)) : new Set();
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
          addChatIdToDB(chatId);
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
      console.error(error?.message);
    }
  }

  async sendMessage(chatId, message) {
    try {
      await this.bot.sendMessage(chatId, message);
    } catch (error) {
      console.error(`Failed to send message to Telegram: ${error.message}`);
    }
  }

  showAllChats() {
    console.log(Array.from(this.chatList).toString() || 'Chat list is empty!');
  }
}

export default TgBot;

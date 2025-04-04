import TelegramBot from 'node-telegram-bot-api';

class TgBot {
  constructor(telegramToken) {
    this.bot = new TelegramBot(telegramToken, { polling: true });
    this.chatList = new Set();
    console.log('Telegram-bot created successfully!');
  }

  startListenMessages() {
    this.bot.on('message', msg => {
      const chatId = msg.chat?.id;
      this.chatList.add(chatId);

      const message = msg.text;

      console.log(this.chatList, message);
    });
  }

  async sendToAll(message) {
    try {
      this.chatList.forEach(
        async chatId => await this.bot.sendMessage(chatId, message)
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  async sendMessage(chatId, message) {
    await this.bot.sendMessage(chatId, message);
  }

  showAllChats() {
    console.log(this.chatList);
  }
}

export default TgBot;

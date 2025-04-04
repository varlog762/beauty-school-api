import TelegramBot from 'node-telegram-bot-api';

class TgBot {
  chatsList = new Set();

  constructor(token) {
    this.bot = new TelegramBot(token, { polling: true });
    this.token = token;
  }

  startListenMessages() {
    this.bot.on('message', msg => {
      const chatId = msg.chat?.id;
      this.chatsList.add(chatId);

      const message = msg.text;

      console.log(message);
    });
  }

  sendToAll(message) {
    this.chatsList.forEach(chatId => this.bot.sendMessage(chatId, message));
  }

  sendMessage(chatId, message) {
    this.bot.sendMessage(chatId, message);
  }
}

export default TgBot;

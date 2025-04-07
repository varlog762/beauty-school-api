import db from '../db/database.js';

export const getAllChatIdsFromDB = () =>
  db.prepare('SELECT chat_id FROM chats').all();

export const addChatIdToDB = chatId => {
  db.prepare('INSERT INTO chats (chat_id) VALUES (?)').run(String(chatId));
};

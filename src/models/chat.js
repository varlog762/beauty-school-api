import db from '../db/database.js';

export const getAllChatIdsFromDB = () => {
  try {
    return db.prepare('SELECT chat_id FROM chats').all();
  } catch (error) {
    console.error(`Failed to fetch chat IDs from DB: ${error.message}`);
    return null;
  }
};

export const addChatIdToDB = chatId => {
  try {
    db.prepare('INSERT INTO chats (chat_id) VALUES (?)').run(String(chatId));
    return true;
  } catch (error) {
    console.error(
      `Failed to insert chat ID (${chatId}) into DB: ${error.message}`
    );
    return false;
  }
};

import db from '../db/database.js';

export const saveClientRequestToDB = (name, phone, course) => {
  try {
    db.prepare(
      'INSERT INTO requests (name, phone, course) VALUES (?, ?, ?)'
    ).run(name, phone, course);
  } catch (error) {
    console.error('Failed to save user request to DB:', error.message);
  }
};

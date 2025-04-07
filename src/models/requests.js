import db from '../db/database.js';

export const saveClientRequestToDB = (name, phone, course) => {
  db.prepare('INSERT INTO requests (name, phone, course) VALUES (?, ?, ?)').run(
    name,
    phone,
    course
  );
};

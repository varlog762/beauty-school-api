import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'data', 'db.sqlite');

const db = new Database(dbPath);

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS chat_admins (
    id TEXT PRIMARY KEY,
    chat_id INTEGER UNIQUE NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`
).run();

export default db;

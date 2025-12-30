import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const DB_PATH = path.join(dataDir, "messages.db");
const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS quiz_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    answers TEXT NOT NULL,
    score INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export function addMessage(name: string, message: string) {
  // store created_at in UTC-5 and include the offset so clients can display it consistently
  const now = new Date();
  const tzMillis = now.getTime() - 5 * 60 * 60 * 1000; // shift to UTC-5
  const tzDate = new Date(tzMillis);
  // produce ISO without milliseconds and with -05:00 offset
  const iso = tzDate.toISOString().replace(/\.\d{3}Z$/, "-05:00");

  const stmt = db.prepare(
    "INSERT INTO messages (name, message, created_at) VALUES (?, ?, ?)"
  );
  const info = stmt.run(name, message, iso);
  return info.lastInsertRowid as number;
}

export function addQuizAttempt(answers: unknown[], score: number) {
  const now = new Date();
  const tzMillis = now.getTime() - 5 * 60 * 60 * 1000; // UTC-5
  const tzDate = new Date(tzMillis);
  const iso = tzDate.toISOString().replace(/\.\d{3}Z$/, "-05:00");

  const stmt = db.prepare(
    "INSERT INTO quiz_attempts (answers, score, created_at) VALUES (?, ?, ?)"
  );
  const info = stmt.run(JSON.stringify(answers), score, iso);
  return info.lastInsertRowid as number;
}

export function getQuizAttempts(limit = 50) {
  const stmt = db.prepare(
    "SELECT id, answers, score, created_at FROM quiz_attempts ORDER BY id DESC LIMIT ?"
  );
  return stmt
    .all(limit)
    .map((r: any) => ({ ...r, answers: JSON.parse(r.answers) }));
}

export function getMessages(limit = 50) {
  const stmt = db.prepare(
    "SELECT id, name, message, created_at FROM messages ORDER BY id DESC LIMIT ?"
  );
  return stmt.all(limit);
}

export default db;

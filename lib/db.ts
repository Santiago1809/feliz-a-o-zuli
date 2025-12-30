import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import os from "os";

function chooseDbPath() {
  // Allow override via env for deployments
  const envPath = process.env.SQLITE_DB_PATH;
  if (envPath) return envPath;

  const dataDir = path.join(process.cwd(), "data");

  try {
    // try to create data directory (works in dev)
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

    // verify we can write into it
    const testFile = path.join(dataDir, ".writetest");
    fs.writeFileSync(testFile, "ok");
    fs.unlinkSync(testFile);

    return path.join(dataDir, "messages.db");
  } catch (err) {
    // probably running on a read-only filesystem (Vercel). Fall back to tmpdir.
    const tmpPath = path.join(os.tmpdir(), "messages.db");
    console.warn("lib/db: data directory not writable, falling back to tmpdir:", tmpPath);
    return tmpPath;
  }
}

const DB_PATH = chooseDbPath();
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

import sqlite3 from "sqlite3";
import path from "path";

const dbName = process.env.DB_NAME || "tasks.db";
const dbPath = path.resolve(__dirname, dbName);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database: " + err.message);
        throw err;
    } else {
        db.serialize(() => {
            db.run(
                `CREATE TABLE IF NOT EXISTS tasks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    description TEXT,
                    completed INTEGER NOT NULL,
                    dueDate TEXT
                )`,
                (err) => {
                    if (err) {
                        console.error("Error creating table: " + err.message);
                    }
                }
            );
        });
    }
});

export default db;
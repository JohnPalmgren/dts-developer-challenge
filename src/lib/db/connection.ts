import sqlite3 from "sqlite3";
import path from "path";

const dbName = process.env.DB_NAME;
const pathToDb = process.env.DB_PATH;

if (!dbName) {
    throw new Error("DB_NAME environment variable is not set");
}
if (!pathToDb) {
    throw new Error("DB_PATH environment variable is not set");
}

// construct the full path to the database file
const fullDBPath = path.resolve(pathToDb, dbName);

const db = new sqlite3.Database(fullDBPath, (err) => {
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
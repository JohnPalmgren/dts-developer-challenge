import db from "@/lib/db/connection";
import { TaskInput } from "@/lib/types";

const selectAllTasks = async () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM tasks", [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

const insertTask = async (task: TaskInput): Promise<{ id:number }> => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO tasks (title, description, completed, dueDate) VALUES (?, ?, ?, ?)",
            [task.title, task.description, task.completed, task.dueDate],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            }
        );
    });
}

export {
    selectAllTasks,
    insertTask
}
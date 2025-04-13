import db from "@/lib/db/connection";
import {
    Task,
    TaskInput
} from "@/lib/types";

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

const insertTask = async (task: TaskInput): Promise<Task> => {
    return new Promise((resolve, reject) => {
        db.get(
            "INSERT INTO tasks (title, description, completed, dueDate) VALUES (?, ?, ?, ?) RETURNING *;",
            [task.title, task.description, task.completed, task.dueDate],
            function (err: Error|null, row: Task|undefined) {
                if (err) {
                    reject(err);
                } else if (row) {
                    resolve(row);
                } else {
                    console.warn("Task not found for insertTask.");
                    reject(new Error("Task not found."));
                }
            }
        );
    });
}

const updateTask = async (task: Task): Promise<Task> => {
    return new Promise((resolve, reject) => {
        db.get(
            "UPDATE tasks SET title = ?, description = ?, completed = ?, dueDate = ? WHERE id = ? RETURNING *;",
            [task.title, task.description, task.completed, task.dueDate, task.id],
            function (err, row: Task|undefined) {
                if (err) {
                    reject(err);
                } else if (row) {
                    resolve(row);
                } else {
                    console.warn(`Task with id ${task.id} not found for updateTask.`);
                    reject(new Error(`Task with id ${task.id} not found.`));
                }
            }
        );
    });
}

export {
    selectAllTasks,
    insertTask,
    updateTask
}
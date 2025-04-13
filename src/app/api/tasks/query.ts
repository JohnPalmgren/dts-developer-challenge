import db from "@/lib/db/connection";
import { Task, TaskInput } from "@/lib/schemas/task.schema";

const selectAllTasks = async (): Promise<Task[]> => {

    const sql = `
        SELECT * FROM tasks
    `
    const params: [] = []

    return new Promise((resolve, reject) => {
        db.all(sql, params, function (err, rows: Task[]) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

const insertTask = async (task: TaskInput): Promise<Task> => {

    const sql = `
        INSERT INTO tasks (title, description, completed, dueDate) 
        VALUES (?, ?, ?, ?)
        RETURNING *;
    `
    const params = [
        task.title,
        task.description,
        task.completed,
        task.dueDate
    ]

    return new Promise((resolve, reject) => {
        db.get(
            sql,params, function (err, row: Task|undefined) {
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



export {
    selectAllTasks,
    insertTask,
}
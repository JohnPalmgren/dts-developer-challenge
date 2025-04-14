import db from "@/lib/db/connection";
import {
    DatabaseFormattedTask,
    Task,
    TaskInput,
} from "@/lib/types";
import { convertTaskToDBFormat, convertTaskToAppFormat } from "@/lib/utils";

const selectAllTasks = async (): Promise<Task[]> => {

    const sql = `
        SELECT * FROM tasks
    `
    const params: [] = []

    return new Promise((resolve, reject) => {
        db.all(sql, params, function (err, rows: DatabaseFormattedTask[]) {
            if (err) {
                reject(err);
            } else {
                // convert from database format to app format
                const formattedRows: Task[] = rows.map(row => {
                    return convertTaskToAppFormat(row)
                })
                resolve(formattedRows);
            }
        });
    });
}

const insertTask = async (task: TaskInput): Promise<Task> => {

    const dbFormattedTask = convertTaskToDBFormat(task)

    const sql = `
        INSERT INTO tasks (title, description, completed, dueDate) 
        VALUES (?, ?, ?, ?)
        RETURNING *;
    `
    const params = [
        dbFormattedTask.title,
        dbFormattedTask.description,
        dbFormattedTask.completed,
        dbFormattedTask.dueDate
    ]

    return new Promise((resolve, reject) => {
        db.get(
            sql,params, function (err, row: DatabaseFormattedTask|undefined) {
                if (err) {
                    reject(err);
                } else if (row) {
                    // Convert from database format to app format
                    const appFormattedTask: Task = convertTaskToAppFormat(row);
                    resolve(appFormattedTask);
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
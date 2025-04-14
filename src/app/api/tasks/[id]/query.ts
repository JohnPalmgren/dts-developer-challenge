import db from "@/lib/db/connection";
import { Task } from "@/lib/schemas/task.schema";
import { DatabaseFormattedTask } from "@/lib/types";
import { convertTaskToDBFormat, convertTaskToAppFormat } from "@/lib/utils";

const selectTaskById = async (id: number): Promise<Task> => {

    const sql = `
        SELECT * FROM tasks
        WHERE id = ?
    `
    const params = [id]

    return new Promise((resolve, reject) => {
        db.get(sql, params, function (err, row: DatabaseFormattedTask|undefined) {
            if (err) {
                reject(err);
            } else if (row) {
                // Convert from database format to app format
                const appFormattedTask: Task = convertTaskToAppFormat(row);
                resolve(appFormattedTask);
            } else {
                console.warn(`Task with id ${id} not found.`);
                reject(new Error(`Task with id ${id} not found.`));
            }
        });
    });
}

const updateTask = async (id: number, task: Task): Promise<Task> => {

    const sql = `
        UPDATE tasks 
        SET title = ?, description = ?, completed = ?, dueDate = ?
        WHERE id = ?
        RETURNING *;
    `

    // Convert task to database format
    const dbFormattedTask = convertTaskToDBFormat(task)

    const params = [
        dbFormattedTask.title,
        dbFormattedTask.description,
        dbFormattedTask.completed,
        dbFormattedTask.dueDate,
        id
    ]


    return new Promise((resolve, reject) => {
        db.get(
            sql, params, function (err, row: DatabaseFormattedTask|undefined) {
                if (err) {
                    reject(err);
                } else if (row) {
                    // Convert from database format to app format
                    const appFormattedTask: Task = convertTaskToAppFormat(row);
                    resolve(appFormattedTask);
                } else {
                    console.warn(`Task with id ${task.id} not found for updateTask.`);
                    reject(new Error(`Task with id ${task.id} not found.`));
                }
            }
        );
    });
}

const deleteTask = async (id: number): Promise<Task> => {

    const sql = `
        DELETE FROM tasks
        WHERE id = ?
        RETURNING *;
    `
    const params = [id]

    return new Promise((resolve, reject) => {
        db.get(sql, params, function (err, row: DatabaseFormattedTask|undefined) {
            if (err) {
                reject(err);
            } else if (row) {
                // Convert from database format to app format
                const appFormattedTask: Task = convertTaskToAppFormat(row);
                resolve(appFormattedTask);
            } else {
                console.warn(`Task with id ${id} not found for deleteTask.`);
                reject(new Error(`Task with id ${id} not found.`));
            }
        });
    });
}

export {
    selectTaskById,
    deleteTask,
    updateTask
}
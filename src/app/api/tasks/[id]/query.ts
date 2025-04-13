import db from "@/lib/db/connection";
import {
    Task
} from "@/lib/types";

const selectTaskById = async (id: number): Promise<Task> => {

    const sql = `
        SELECT * FROM tasks
        WHERE id = ?
    `
    const params = [id]

    return new Promise((resolve, reject) => {
        db.get(sql, params, function (err, row: Task|undefined) {
            if (err) {
                reject(err);
            } else if (row) {
                resolve(row);
            } else {
                console.warn(`Task with id ${id} not found.`);
                reject(new Error(`Task with id ${id} not found.`));
            }
        });
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
        db.get(sql, params, function (err, row: Task|undefined) {
            if (err) {
                reject(err);
            } else if (row) {
                resolve(row);
            } else {
                console.warn(`Task with id ${id} not found for deleteTask.`);
                reject(new Error(`Task with id ${id} not found.`));
            }
        });
    });
}

export {
    selectTaskById,
    deleteTask
}
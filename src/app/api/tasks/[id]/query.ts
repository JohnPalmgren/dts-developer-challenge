import db from "@/lib/db/connection";
import {
    Task,
    TaskInput
} from "@/lib/types";

const selectTaskById = async (id: number): Promise<Task> => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row: Task|undefined) => {
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

export {
    selectTaskById,
}
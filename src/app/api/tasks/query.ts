import db from "@/lib/db/connection";

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

export {
    selectAllTasks
}
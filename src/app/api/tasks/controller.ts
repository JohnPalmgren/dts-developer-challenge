import {
    Task,
    TaskInput
} from "@/lib/types";
import {
    insertTask,
    selectAllTasks,
    updateTask
} from "@/app/api/tasks/query";

const getAllTasks = async () => {
    return selectAllTasks()
}

const createTask = async (task: TaskInput) => {
    return insertTask(task);
}

const editTask = async (task: Task) => {
    return updateTask(task)
}

export {
    getAllTasks,
    createTask,
    editTask
};
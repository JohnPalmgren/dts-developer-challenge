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
    try {
        const { id } = await insertTask(task);
        return {
            ...task,
            id: id
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Internal Server Error");
        }
    }
}

const editTask = async (task: Task) => {
    return updateTask(task)
}

export {
    getAllTasks,
    createTask,
    editTask
};
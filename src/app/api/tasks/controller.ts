import {TaskInput} from "@/lib/types";
import {insertTask, selectAllTasks} from "@/app/api/tasks/query";

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

export {
    getAllTasks,
    createTask
};
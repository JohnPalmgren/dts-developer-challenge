import { selectAllTasks } from "@/app/api/tasks/query";

const getAllTasks = async () => {
    return selectAllTasks()
}

export {
    getAllTasks
};
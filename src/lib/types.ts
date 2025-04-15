import { TaskSchema, TaskInputSchema } from "@/lib/schemas/task.schema";
import { z } from "zod";

interface DatabaseFormattedTask {
    id: number;
    title: string;
    description?: string;
    completed: number;
    dueDate: string;
}

type DatabaseFormattedInputTask = Omit<DatabaseFormattedTask, 'id'>;

type Task = z.infer<typeof TaskSchema>;

type TaskInput = z.infer<typeof TaskInputSchema>;

interface RouteParams {
    params: Promise<{
        id: string;
    }>
}

interface State {
    tasks: Task[];
    error: string | null;
}

type Action =
    | { type: typeof ActionTypes.SET_TASKS; payload: Task[] }
    | { type: typeof ActionTypes.ADD_TASK; payload: Task }
    | { type: typeof ActionTypes.REMOVE_TASK; payload: number }
    | { type: typeof ActionTypes.UPDATE_TASK; payload: Task }
    | { type: typeof ActionTypes.SET_ERROR; payload: string | null };

export const ActionTypes = {
    SET_TASKS: "SET_TASKS",
    ADD_TASK: "ADD_TASK",
    REMOVE_TASK: "REMOVE_TASK",
    UPDATE_TASK: "UPDATE_TASK",
    SET_ERROR: "SET_ERROR",
} as const;

export type {
    RouteParams,
    DatabaseFormattedTask,
    DatabaseFormattedInputTask,
    Task,
    TaskInput,
    State,
    Action,
};

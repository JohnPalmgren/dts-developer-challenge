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

export type {
    RouteParams,
    DatabaseFormattedTask,
    DatabaseFormattedInputTask,
    Task,
    TaskInput,
};
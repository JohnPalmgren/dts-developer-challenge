import { z } from "zod";

const TaskSchema = z.object({
    id: z.number().int().positive(),
    title: z.string().nonempty(),
    description: z.string().optional(),
    completed: z.boolean(),
    dueDate: z.coerce.date(),
});

const TaskInputSchema = TaskSchema.omit({ id: true });

type Task = z.infer<typeof TaskSchema>;

type TaskInput = z.infer<typeof TaskInputSchema>;

export {
    TaskSchema,
    TaskInputSchema,
}

export type {
    Task,
    TaskInput,
}
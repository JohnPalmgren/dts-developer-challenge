interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    dueDate: Date;
}

type TaskInput = Omit<Task, 'id'>;

interface RouteParams {
    params: Promise<{
        id: string;
    }>
}

export type {
    Task,
    TaskInput,
    RouteParams,
};
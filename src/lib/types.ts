interface DatabaseFormattedTask {
    id: number;
    title: string;
    description?: string;
    completed: number;
    dueDate: string;
}

type DatabaseFormattedInputTask = Omit<DatabaseFormattedTask, 'id'>;

interface RouteParams {
    params: Promise<{
        id: string;
    }>
}

export type {
    RouteParams,
    DatabaseFormattedTask,
    DatabaseFormattedInputTask,
};
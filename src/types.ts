interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    dueDate: Date;
}

export type { Task };
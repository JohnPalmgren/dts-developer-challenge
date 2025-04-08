interface Task {
    id: number;
    title: string;
    description?: string;
    status: number;
    dueDate: Date;
}

export type { Task };
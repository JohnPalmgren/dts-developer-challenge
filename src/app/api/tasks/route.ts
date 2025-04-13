import { NextRequest, NextResponse } from 'next/server';
import {Task, TaskInput} from "@/lib/types";
import {
    getAllTasks,
    createTask
} from "@/app/api/tasks/controller";

const dummyData: Array<Task> = [
    {
        id: 0,
        title: "task 1",
        description: "description 1",
        completed: false,
        dueDate: new Date()
    },
    {
        id: 1,
        title: "task 2",
        description: "description 2",
        completed: false,
        dueDate: new Date()
    },
    {
        id: 2,
        title: "task 3",
        completed: false,
        dueDate: new Date()
    },
    {
        id: 3,
        title: "task 4",
        completed: true,
        dueDate: new Date()
    },
    {
        id: 4,
        title: "task 5",
        description: "description 5",
        completed: true,
        dueDate: new Date()
    }
]

const GET = async () => {
    try {
        const tasks = getAllTasks()
        return NextResponse.json(tasks, {status: 200, statusText: "OK"});
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, {status: 500, statusText: error.message});
        } else {
            return NextResponse.json({error: "Internal Server Error"}, {status: 500, statusText: "Internal Server Error"});
        }
    }
}

const POST = async (request: NextRequest) => {
    // TODO add validation
    const newTask: TaskInput = await request.json();
    const storedTask: Task = await createTask(newTask);
    return NextResponse.json(storedTask, {status: 200, statusText: "OK"});
}

const PUT = async (request: NextRequest) => {
    // TODO add validation
    const updatedTask = await request.json();
    const index = dummyData.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
        dummyData[index] = updatedTask;
        return NextResponse.json(dummyData, {status: 200, statusText: "OK"});
    } else {
        return NextResponse.json({error: "Task not found"}, {status: 404, statusText: "Not Found"});
    }
}

export {
    GET,
    POST,
    PUT
};
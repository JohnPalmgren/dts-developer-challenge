import { NextRequest, NextResponse } from 'next/server';
import {Task, TaskInput} from "@/lib/types";
import {
    getAllTasks,
    createTask,
    editTask
} from "@/app/api/tasks/controller";

const GET = async () => {
    try {
        const tasks = await getAllTasks()
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
    try {
        const updatedTask: Task = await request.json();
        const storedTask: Task = await editTask(updatedTask);
        return NextResponse.json(storedTask, {status: 200, statusText: "OK"});
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, {status: 500, statusText: error.message});
        } else {
            return NextResponse.json({error: "Internal Server Error"}, {status: 500, statusText: "Internal Server Error"});
        }
    }
}

export {
    GET,
    POST,
    PUT
};
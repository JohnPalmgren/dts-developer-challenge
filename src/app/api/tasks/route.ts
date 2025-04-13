import { NextRequest, NextResponse } from 'next/server';
import {Task, TaskInput} from "@/lib/types";
import {
    selectAllTasks,
    insertTask,
    updateTask
} from "@/app/api/tasks/query";

const GET = async () => {
    try {
        const tasks = await selectAllTasks()
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
    const storedTask: Task = await insertTask(newTask);
    return NextResponse.json(storedTask, {status: 200, statusText: "OK"});
}

const PUT = async (request: NextRequest) => {
    // TODO add validation
    try {
        const updatedTask: Task = await request.json();
        const storedTask: Task = await updateTask(updatedTask);
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
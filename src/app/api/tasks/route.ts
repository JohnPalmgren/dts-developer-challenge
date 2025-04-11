import { Task } from "@/lib/types";
import { NextRequest, NextResponse } from 'next/server';

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
    return NextResponse.json(dummyData, {status: 200, statusText: "OK"});
}

const POST = async (request: NextRequest) => {
    // TODO add validation
    const newTask = await request.json();
    newTask.id = Date.now()
    dummyData.push(newTask);
    return NextResponse.json(dummyData, {status: 200, statusText: "OK"});
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
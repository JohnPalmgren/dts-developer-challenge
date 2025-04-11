import {NextRequest, NextResponse} from "next/server";
import {RouteParams, Task} from "@/lib/types";

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

const GET = async (request: NextRequest, { params }: RouteParams) => {
    const id = parseInt((await params).id)
    const task = dummyData.find((task) => task.id === id);
    if (task) {
        return NextResponse.json(task, {status: 200, statusText: "OK"})
    }
    return NextResponse.json(dummyData, {status: 404, statusText: "Resource Not Found"})
}

const DELETE = async (request: NextRequest, { params }: RouteParams) => {
    const id = parseInt((await params).id)
    const index = dummyData.findIndex((task) => task.id === id);
    if (index !== -1) {
        dummyData.splice(index, 1);
        return NextResponse.json(dummyData, {status: 200, statusText: "OK"})
    }
    return NextResponse.json(dummyData, {status: 404, statusText: "Resource Not Found"})
}

export {
    GET,
    DELETE,
}
import {NextRequest, NextResponse} from "next/server";
import { RouteParams, Task } from "@/lib/types";
import { TaskSchema } from "@/lib/schemas/task.schema";
import {
    selectTaskById,
    deleteTask,
    updateTask
} from "@/app/api/tasks/[id]/query";

const GET = async (request: NextRequest, { params }: RouteParams) => {
    const id = parseInt((await params).id)
    if (isNaN(id)) {
        return NextResponse.json({error: "Invalid ID"}, {status: 400, statusText: "Bad Request"});
    }
    try {
        const task = await selectTaskById(id);
        return NextResponse.json(task, {status: 200, statusText: "OK"});
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, {status: 500, statusText: error.message});
        } else {
            return NextResponse.json({error: "Internal Server Error"}, {status: 500, statusText: "Internal Server Error"});
        }
    }
}

const PUT = async (request: NextRequest, { params }: RouteParams) => {
    // TODO check task id matches params
    // Updating id should be disallowed on the database level
    try {
        const id = parseInt((await params).id)
        if (isNaN(id)) {
            return NextResponse.json({error: "Invalid ID"}, {status: 400, statusText: "Bad Request"});
        }
        const updatedTask: Task = await request.json();
        const validationResult = TaskSchema.safeParse(updatedTask);
        if (!validationResult.success) {
            return NextResponse.json({ error: "Invalid input", details: validationResult.error.format() }, { status: 400 });
        }
        const storedTask: Task = await updateTask(id, validationResult.data);
        return NextResponse.json(storedTask, {status: 200, statusText: "OK"});
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, {status: 500, statusText: error.message});
        } else {
            return NextResponse.json({error: "Internal Server Error"}, {status: 500, statusText: "Internal Server Error"});
        }
    }
}

const DELETE = async (request: NextRequest, { params }: RouteParams) => {
    const id = parseInt((await params).id)
    if (isNaN(id)) {
        return NextResponse.json({error: "Invalid ID"}, {status: 400, statusText: "Bad Request"});
    }
    try {
        const deletedTask = await deleteTask(id);
        return NextResponse.json(deletedTask, {status: 200, statusText: "OK"});
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
    PUT,
    DELETE
}
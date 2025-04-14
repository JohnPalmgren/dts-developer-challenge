import { NextRequest, NextResponse } from 'next/server';
import { TaskInputSchema, Task, TaskInput } from "@/lib/schemas/task.schema";
import { selectAllTasks, insertTask } from "@/app/api/tasks/query";

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
    try {
        const newTask: TaskInput = await request.json();
        const validationResult = TaskInputSchema.safeParse(newTask);
        if (!validationResult.success) {
            return NextResponse.json({ error: "Invalid input", details: validationResult.error.format() }, { status: 400 });
        }
        const storedTask: Task = await insertTask(validationResult.data);
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
    POST
};
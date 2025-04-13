import {NextRequest, NextResponse} from "next/server";
import {RouteParams} from "@/lib/types";
import {
    selectTaskById,
    deleteTask
} from "@/app/api/tasks/[id]/query";

const GET = async (request: NextRequest, { params }: RouteParams) => {
    const id = parseInt((await params).id)
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

const DELETE = async (request: NextRequest, { params }: RouteParams) => {
    const id = parseInt((await params).id)
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
    DELETE
}
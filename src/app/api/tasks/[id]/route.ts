import {NextRequest, NextResponse} from "next/server";
import {RouteParams} from "@/lib/types";
import {
    selectTaskById,
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

// const DELETE = async (request: NextRequest, { params }: RouteParams) => {
//     const id = parseInt((await params).id)
//     const index = dummyData.findIndex((task) => task.id === id);
//     if (index !== -1) {
//         dummyData.splice(index, 1);
//         return NextResponse.json(dummyData, {status: 200, statusText: "OK"})
//     }
//     return NextResponse.json(dummyData, {status: 404, statusText: "Resource Not Found"})
// }

export {
    GET,
}
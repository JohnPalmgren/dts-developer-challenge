import { NextRequest } from "next/server";
import { GET } from "./route";
import { selectTaskById } from "@/app/api/tasks/[id]/query";

jest.mock("@/app/api/tasks/[id]/query", () => ({
    selectTaskById: jest.fn(),
}));

describe("GET function", () => {
    const mockParams = Promise.resolve({ id: "1" });
    const mockRequest = {} as NextRequest;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return a task with status 200 when found", async () => {
        const mockTask = { id: 1, name: "Test Task" };
        (selectTaskById as jest.Mock).mockResolvedValue(mockTask);

        const response = await GET(mockRequest, { params: mockParams });
        const json = await response.json();

        expect(selectTaskById).toHaveBeenCalledWith(1);
        expect(response.status).toBe(200);
        expect(json).toEqual(mockTask);
    });

    it("should return status 500 with error message if selectTaskById throws an error", async () => {
        (selectTaskById as jest.Mock).mockRejectedValue(new Error("Database error"));

        const response = await GET(mockRequest, { params: mockParams });
        const json = await response.json();

        expect(selectTaskById).toHaveBeenCalledWith(1);
        expect(response.status).toBe(500);
        expect(json).toEqual({ error: "Database error" });
    });

    it("should return status 500 with generic error if an unknown error occurs", async () => {
        (selectTaskById as jest.Mock).mockRejectedValue("Unknown error");

        const response = await GET(mockRequest, { params: mockParams });
        const json = await response.json();

        expect(selectTaskById).toHaveBeenCalledWith(1);
        expect(response.status).toBe(500);
        expect(json).toEqual({ error: "Internal Server Error" });
    });

    it("should handle invalid ID parsing gracefully", async () => {
        const invalidParams = Promise.resolve({ id: "invalid" });

        const response = await GET(mockRequest, { params: invalidParams });
        const json = await response.json();

        expect(selectTaskById).not.toHaveBeenCalled();
        expect(response.status).toBe(400);
        expect(json).toEqual({ error: "Invalid ID" });
    });
});
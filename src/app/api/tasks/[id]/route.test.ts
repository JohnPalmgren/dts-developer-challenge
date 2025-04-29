import { NextRequest } from "next/server";
import {
    GET,
    PUT,
    DELETE
} from "./route";
import {
    selectTaskById,
    updateTask,
    deleteTask
} from "@/app/api/tasks/[id]/query";

jest.mock("@/app/api/tasks/[id]/query", () => ({
    selectTaskById: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
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

describe("PUT function", () => {
    const mockParams = Promise.resolve({ id: "1" });
    const mockRequest = {
        json: jest.fn(),
    } as unknown as NextRequest;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should update a task and return status 200 when input is valid", async () => {
        const mockTask = { id: 1, title: "Updated Task", completed: true, dueDate: new Date()};
        const expectedTask = { ...mockTask, dueDate: mockTask.dueDate.toISOString() }
        mockRequest.json = jest.fn().mockResolvedValue(mockTask);
        (updateTask as jest.Mock).mockResolvedValue(mockTask);

        const response = await PUT(mockRequest, { params: mockParams });
        const json = await response.json();

        expect(updateTask).toHaveBeenCalledWith(1, mockTask);
        expect(response.status).toBe(200);
        expect(json).toEqual(expectedTask);
    });

    it("should return status 400 with validation errors for no title", async () => {
        const invalidTask = { id: 1, title: "", completed: true, dueDate: new Date()};
        mockRequest.json = jest.fn().mockResolvedValue(invalidTask);

        const response = await PUT(mockRequest, { params: mockParams });
        const json = await response.json();

        expect(updateTask).not.toHaveBeenCalled();
        expect(response.status).toBe(400);
        expect(json).toHaveProperty("error", "Invalid input");
        expect(json).toHaveProperty("details");
    });

    it("should return status 400 with validation errors for incorrect completed argument", async () => {
        const invalidTask = { id: 1, title: "Updated task", completed: "invalid value", dueDate: new Date()};
        mockRequest.json = jest.fn().mockResolvedValue(invalidTask);

        const response = await PUT(mockRequest, { params: mockParams });
        const json = await response.json();

        expect(updateTask).not.toHaveBeenCalled();
        expect(response.status).toBe(400);
        expect(json).toHaveProperty("error", "Invalid input");
        expect(json).toHaveProperty("details");
    });

    it("should return status 400 with validation errors for incorrect  date argument", async () => {
        const invalidTask = { id: 1, title: "Updated task", completed: true, dueDate: "invalid date"};
        mockRequest.json = jest.fn().mockResolvedValue(invalidTask);

        const response = await PUT(mockRequest, { params: mockParams });
        const json = await response.json();

        expect(updateTask).not.toHaveBeenCalled();
        expect(response.status).toBe(400);
        expect(json).toHaveProperty("error", "Invalid input");
        expect(json).toHaveProperty("details");
    });

    it("should return status 500 with error message if updateTask throws an error", async () => {
        const mockTask = {id: 1, title: "Updated Task", completed: true, dueDate: new Date() };
        mockRequest.json = jest.fn().mockResolvedValue(mockTask);
        (updateTask as jest.Mock).mockRejectedValue(new Error("Database error"));

        const response = await PUT(mockRequest, { params: mockParams });
        const json = await response.json();

        expect(updateTask).toHaveBeenCalledWith(1, mockTask);
        expect(response.status).toBe(500);
        expect(json).toEqual({ error: "Database error" });
    });

    it("should return status 500 with generic error if an unknown error occurs", async () => {
        const mockTask = { id: 1, title: "Updated Task", completed: true, dueDate: new Date() };
        mockRequest.json = jest.fn().mockResolvedValue(mockTask);
        (updateTask as jest.Mock).mockRejectedValue("Unknown error");

        const response = await PUT(mockRequest, { params: mockParams });
        const json = await response.json();

        expect(updateTask).toHaveBeenCalledWith(1, mockTask);
        expect(response.status).toBe(500);
        expect(json).toEqual({ error: "Internal Server Error" });
    });

    it("should handle invalid ID parsing gracefully", async () => {
        const invalidParams = Promise.resolve({ id: "invalid" });
        const mockTask = { id: 1, title: "Updated Task", completed: true, dueDate: new Date() };
        mockRequest.json = jest.fn().mockResolvedValue(mockTask);

        const response = await PUT(mockRequest, { params: invalidParams });
        const json = await response.json();

        expect(updateTask).not.toHaveBeenCalled();
        expect(response.status).toBe(400);
        expect(json).toEqual({ error: "Invalid ID" });
    });
});

describe("DELETE function", () => {
    const mockParams = Promise.resolve({ id: "1" });
    const mockRequest = {} as NextRequest;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should delete a task and return status 200 when successful", async () => {
        const mockDeletedTask = { id: 1, name: "Deleted Task" };
        (deleteTask as jest.Mock).mockResolvedValue(mockDeletedTask);

        const response = await DELETE(mockRequest, { params: mockParams });
        const json = await response.json();

        expect(deleteTask).toHaveBeenCalledWith(1);
        expect(response.status).toBe(200);
        expect(json).toEqual(mockDeletedTask);
    });

    it("should handle invalid ID parsing gracefully", async () => {
        const invalidParams = Promise.resolve({ id: "invalid" });

        const response = await DELETE(mockRequest, { params: invalidParams });
        const json = await response.json();

        expect(deleteTask).not.toHaveBeenCalled();
        expect(response.status).toBe(400);
        expect(json).toEqual({ error: "Invalid ID" });
    });

    it("should return status 500 with error message if deleteTask throws an error", async () => {
        (deleteTask as jest.Mock).mockRejectedValue(new Error("Database error"));

        const response = await DELETE(mockRequest, { params: mockParams });
        const json = await response.json();

        expect(deleteTask).toHaveBeenCalledWith(1);
        expect(response.status).toBe(500);
        expect(json).toEqual({ error: "Database error" });
    });

    it("should return status 500 with generic error if an unknown error occurs", async () => {
        (deleteTask as jest.Mock).mockRejectedValue("Unknown error");

        const response = await DELETE(mockRequest, { params: mockParams });
        const json = await response.json();

        expect(deleteTask).toHaveBeenCalledWith(1);
        expect(response.status).toBe(500);
        expect(json).toEqual({ error: "Internal Server Error" });
    });
});
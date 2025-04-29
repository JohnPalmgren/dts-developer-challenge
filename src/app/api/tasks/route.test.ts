import { GET, POST } from './route';
import { selectAllTasks, insertTask } from '@/app/api/tasks/query';
import {NextRequest} from "next/server";

jest.mock('@/app/api/tasks/query', () => ({
    selectAllTasks: jest.fn(),
    insertTask: jest.fn(),
}));

describe('GET function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a 200 response with tasks on success', async () => {
        const mockTasks = [
            { id: 1, title: 'Task 1', completed: false },
            { id: 2, title: 'Task 2', completed: true },
        ];
        (selectAllTasks as jest.Mock).mockResolvedValue(mockTasks);

        const response = await GET();
        const json = await response.json();

        expect(selectAllTasks).toHaveBeenCalledTimes(1);
        expect(response.status).toBe(200);
        expect(json).toEqual(mockTasks);
    });

    it('should return a 500 response with an error message on failure', async () => {
        const mockError = new Error('Database error');
        (selectAllTasks as jest.Mock).mockRejectedValue(mockError);

        const response = await GET();
        const json = await response.json();

        expect(selectAllTasks).toHaveBeenCalledTimes(1);
        expect(response.status).toBe(500);
        expect(json).toEqual({ error: 'Database error' });
    });

    it('should return a 500 response with a generic error message for non-Error objects', async () => {
        (selectAllTasks as jest.Mock).mockRejectedValue('Unknown error');

        const response = await GET();
        const json = await response.json();

        expect(selectAllTasks).toHaveBeenCalledTimes(1);
        expect(response.status).toBe(500);
        expect(json).toEqual({ error: 'Internal Server Error' });
    });
});

describe('POST function', () => {
    it('should return a 200 response with the stored task on success', async () => {
        const mockTask = { id: 1, title: 'Task 1', completed: false, dueDate: new Date().toISOString() };
        const mockRequest = {
            json: jest.fn().mockResolvedValue(mockTask),
        } as unknown as NextRequest;

        (insertTask as jest.Mock).mockResolvedValue(mockTask);

        const response = await POST(mockRequest);
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual(mockTask);
    });


    it('should return a 400 response with validation errors for invalid title', async () => {
        const invalidTask = { title: '', completed: false };
        const mockRequest = {
            json: jest.fn().mockResolvedValue(invalidTask),
        } as unknown as NextRequest;

        const response = await POST(mockRequest);
        const json = await response.json();

        expect(response.status).toBe(400);
        expect(json).toHaveProperty('error', 'Invalid input');
    });

    it('should return a 400 response with validation errors for invalid completed argument', async () => {
        const invalidTask = { title: 'Task 1', completed: "false" };
        const mockRequest = {
            json: jest.fn().mockResolvedValue(invalidTask),
        } as unknown as NextRequest;

        const response = await POST(mockRequest);
        const json = await response.json();

        expect(response.status).toBe(400);
        expect(json).toHaveProperty('error', 'Invalid input');
    });

    it('should return a 400 response with validation errors for invalid dueDate argument', async () => {
        const invalidTask = { title: 'Task 1', completed: false, dueDate: "invalid date" };
        const mockRequest = {
            json: jest.fn().mockResolvedValue(invalidTask),
        } as unknown as NextRequest;

        const response = await POST(mockRequest);
        const json = await response.json();

        expect(response.status).toBe(400);
        expect(json).toHaveProperty('error', 'Invalid input');
    });

    it('should return a 500 response with an error message on insertion failure', async () => {
        const validTask = { title: 'Task 1', completed: false, dueDate: new Date().toISOString() };
        const mockRequest = {
            json: jest.fn().mockResolvedValue(validTask),
        } as unknown as NextRequest;

        const mockError = new Error('Database insertion error');
        (insertTask as jest.Mock).mockRejectedValue(mockError);

        const response = await POST(mockRequest);
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json).toEqual({ error: 'Database insertion error' });
    });

    it('should return a 500 response with a generic error message for non-Error objects', async () => {
        const validTask = { title: 'Task 1', completed: false, dueDate: new Date().toISOString() };
        const mockRequest = {
            json: jest.fn().mockResolvedValue(validTask),
        } as unknown as NextRequest;

        (insertTask as jest.Mock).mockRejectedValue('Unknown error');

        const response = await POST(mockRequest);
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json).toEqual({ error: 'Internal Server Error' });
    });
})
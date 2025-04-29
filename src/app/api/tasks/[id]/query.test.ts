import {
    selectTaskById,
    updateTask,
} from './query';
import db from '@/lib/db/connection';
import {
    convertTaskToAppFormat,
    convertTaskToDBFormat
} from '@/lib/utils';
import { DatabaseFormattedTask, Task } from '@/lib/types';


jest.mock('@/lib/utils', () => ({
    convertTaskToAppFormat: jest.fn(),
    convertTaskToDBFormat: jest.fn(),
}));

jest.mock('@/lib/db/connection', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
    },
}));

beforeAll(() => {
    // Suppress console.warn for expected warnings
    jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('selectTaskById', () => {
    const mockDbGet = db.get as jest.Mock;
    const mockConvertTaskToAppFormat = convertTaskToAppFormat as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should resolve with the task in app format when the task is found', async () => {
        const testDate = new Date('2023-10-01');

        const mockRow: DatabaseFormattedTask = {
            id: 1,
            title: 'Test Task',
            description: 'Test Description',
            completed: 0,
            dueDate: testDate.toISOString(),
        };

        const mockTask: Task = {
            id: 1,
            title: 'Test Task',
            description: 'Test Description',
            completed: false,
            dueDate: testDate,
        };

        mockDbGet.mockImplementation((sql, params, callback) => {
            callback(null, mockRow);
        });
        mockConvertTaskToAppFormat.mockReturnValue(mockTask);

        const result = await selectTaskById(1);

        expect(mockDbGet).toHaveBeenCalledWith(
            expect.any(String),
            [1],
            expect.any(Function)
        );
        expect(mockConvertTaskToAppFormat).toHaveBeenCalledWith(mockRow);
        expect(result).toEqual(mockTask);
    });

    it('should reject with an error when the task is not found', async () => {
        mockDbGet.mockImplementation((sql, params, callback) => {
            callback(null, undefined);
        });

        await expect(selectTaskById(1)).rejects.toThrow('Task with id 1 not found.');
        expect(mockDbGet).toHaveBeenCalledWith(
            expect.any(String),
            [1],
            expect.any(Function)
        );
    });

    it('should reject with an error when the database query fails', async () => {
        const mockError = new Error('Database error');
        mockDbGet.mockImplementation((sql, params, callback) => {
            callback(mockError, undefined);
        });

        await expect(selectTaskById(1)).rejects.toThrow('Database error');
        expect(mockDbGet).toHaveBeenCalledWith(
            expect.any(String),
            [1],
            expect.any(Function)
        );
    });
});

describe('updateTask', () => {
    const mockDbGet = db.get as jest.Mock;
    const mockConvertTaskToDBFormat = convertTaskToDBFormat as jest.Mock;
    const mockConvertTaskToAppFormat = convertTaskToAppFormat as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should resolve with the updated task in app format when the update is successful', async () => {
        const testDate = new Date('2023-10-01');

        const mockTask: Task = {
            id: 1,
            title: 'Updated Task',
            description: 'Updated Description',
            completed: true,
            dueDate: testDate,
        };

        const mockDbFormattedTask: DatabaseFormattedTask = {
            id: 1,
            title: 'Updated Task',
            description: 'Updated Description',
            completed: 1,
            dueDate: testDate.toISOString(),
        };

        mockConvertTaskToDBFormat.mockReturnValue(mockDbFormattedTask);
        mockDbGet.mockImplementation((sql, params, callback) => {
            callback(null, mockDbFormattedTask);
        });
        mockConvertTaskToAppFormat.mockReturnValue(mockTask);

        const result = await updateTask(1, mockTask);

        expect(mockConvertTaskToDBFormat).toHaveBeenCalledWith(mockTask);
        expect(mockDbGet).toHaveBeenCalledWith(
            expect.any(String),
            [
                mockDbFormattedTask.title,
                mockDbFormattedTask.description,
                mockDbFormattedTask.completed,
                mockDbFormattedTask.dueDate,
                1,
            ],
            expect.any(Function)
        );
        expect(mockConvertTaskToAppFormat).toHaveBeenCalledWith(mockDbFormattedTask);
        expect(result).toEqual(mockTask);
    });

    it('should reject with an error when the task is not found', async () => {
        const mockTask: Task = {
            id: 1,
            title: 'Updated Task',
            description: 'Updated Description',
            completed: true,
            dueDate: new Date('2023-10-01'),
        };

        mockConvertTaskToDBFormat.mockReturnValue({});
        mockDbGet.mockImplementation((sql, params, callback) => {
            callback(null, undefined);
        });

        await expect(updateTask(1, mockTask)).rejects.toThrow('Task with id 1 not found.');
        expect(mockDbGet).toHaveBeenCalledWith(expect.any(String), expect.any(Array), expect.any(Function));
    });

    it('should reject with an error when the database query fails', async () => {
        const mockTask: Task = {
            id: 1,
            title: 'Updated Task',
            description: 'Updated Description',
            completed: true,
            dueDate: new Date('2023-10-01'),
        };

        const mockError = new Error('Database error');
        mockConvertTaskToDBFormat.mockReturnValue({});
        mockDbGet.mockImplementation((sql, params, callback) => {
            callback(mockError, undefined);
        });

        await expect(updateTask(1, mockTask)).rejects.toThrow('Database error');
        expect(mockDbGet).toHaveBeenCalledWith(expect.any(String), expect.any(Array), expect.any(Function));
    });
});
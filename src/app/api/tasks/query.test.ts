import {insertTask, selectAllTasks} from './query';
import db from '@/lib/db/connection';
import { convertTaskToAppFormat, convertTaskToDBFormat } from '@/lib/utils';
import {DatabaseFormattedTask, Task, TaskInput} from '@/lib/types';

jest.mock('@/lib/utils', () => ({
    convertTaskToDBFormat: jest.fn(),
    convertTaskToAppFormat: jest.fn(),
}));
jest.mock('@/lib/db/connection', () => ({
    __esModule: true,
    default: {
        all: jest.fn(),
        get: jest.fn(),
    },
}));

describe('selectAllTasks', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should resolve with formatted tasks when the query is successful', async () => {
        const task1Date = new Date('2023-10-01').toISOString()
        const task2Date = new Date('2023-10-02').toISOString()

        const mockRows: DatabaseFormattedTask[] = [
            { id: 1, title: 'Task 1', description: 'Description 1', completed: 0, dueDate: task1Date },
            { id: 2, title: 'Task 2', description: 'Description 2', completed: 1, dueDate: task2Date },
        ];
        const mockFormattedTasks: Task[] = [
            { id: 1, title: 'Task 1', description: 'Description 1', completed: false, dueDate: new Date(task1Date) },
            { id: 2, title: 'Task 2', description: 'Description 2', completed: true, dueDate: new Date(task2Date) },
        ];

        (db.all as jest.Mock).mockImplementation((sql, params, callback) => {
            callback(null, mockRows);
        });
        (convertTaskToAppFormat as jest.Mock).mockImplementation((row) => mockFormattedTasks.find(task => task.id === row.id));

        const result = await selectAllTasks();

        expect(db.all).toHaveBeenCalledWith(expect.any(String), [], expect.any(Function));
        expect(convertTaskToAppFormat).toHaveBeenCalledTimes(mockRows.length);
        expect(result).toEqual(mockFormattedTasks);
    });

    it('should reject with an error when the query fails', async () => {
        const mockError = new Error('Database error');

        (db.all as jest.Mock).mockImplementation((sql, params, callback) => {
            callback(mockError, null);
        });

        await expect(selectAllTasks()).rejects.toThrow('Database error');
        expect(db.all).toHaveBeenCalledWith(expect.any(String), [], expect.any(Function));
        expect(convertTaskToAppFormat).not.toHaveBeenCalled();
    });
});

describe('insertTask', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should resolve with the inserted task when the query is successful', async () => {
        const mockTaskInput: TaskInput = {
            title: 'New Task',
            description: 'Task description',
            completed: false,
            dueDate: new Date('2023-10-10'),
        };

        const mockDBFormattedTask: DatabaseFormattedTask = {
            id: 1,
            title: 'New Task',
            description: 'Task description',
            completed: 0,
            dueDate: '2023-10-10T00:00:00.000Z',
        };

        const mockDBRow: DatabaseFormattedTask = {
            id: 1,
            title: 'New Task',
            description: 'Task description',
            completed: 0,
            dueDate: '2023-10-10T00:00:00.000Z',
        };

        const mockAppFormattedTask: Task = {
            id: 1,
            title: 'New Task',
            description: 'Task description',
            completed: false,
            dueDate: new Date('2023-10-10'),
        };

        (convertTaskToDBFormat as jest.Mock).mockReturnValue(mockDBFormattedTask);
        (convertTaskToAppFormat as jest.Mock).mockReturnValue(mockAppFormattedTask);
        (db.get as jest.Mock).mockImplementation((sql, params, callback) => {
            callback(null, mockDBRow);
        });

        const result = await insertTask(mockTaskInput);

        expect(convertTaskToDBFormat).toHaveBeenCalledWith(mockTaskInput);
        expect(db.get).toHaveBeenCalledWith(expect.any(String), expect.any(Array), expect.any(Function));
        expect(convertTaskToAppFormat).toHaveBeenCalledWith(mockDBRow);
        expect(result).toEqual(mockAppFormattedTask);
    });

    it('should reject with an error when the query fails', async () => {
        const mockTaskInput: TaskInput = {
            title: 'New Task',
            description: 'Task description',
            completed: false,
            dueDate: new Date('2023-10-10'),
        };

        const mockError = new Error('Database error');

        (convertTaskToDBFormat as jest.Mock).mockReturnValue({});
        (db.get as jest.Mock).mockImplementation((sql, params, callback) => {
            callback(mockError, null);
        });

        await expect(insertTask(mockTaskInput)).rejects.toThrow('Database error');
        expect(convertTaskToDBFormat).toHaveBeenCalledWith(mockTaskInput);
        expect(db.get).toHaveBeenCalledWith(expect.any(String), expect.any(Array), expect.any(Function));
        expect(convertTaskToAppFormat).not.toHaveBeenCalled();
    });

    it('should reject with an error when no row is returned', async () => {
        const mockTaskInput: TaskInput = {
            title: 'New Task',
            description: 'Task description',
            completed: false,
            dueDate: new Date('2023-10-10'),
        };

        (convertTaskToDBFormat as jest.Mock).mockReturnValue({});
        (db.get as jest.Mock).mockImplementation((sql, params, callback) => {
            callback(null, undefined);
        });

        await expect(insertTask(mockTaskInput)).rejects.toThrow('Task not found.');
        expect(convertTaskToDBFormat).toHaveBeenCalledWith(mockTaskInput);
        expect(db.get).toHaveBeenCalledWith(expect.any(String), expect.any(Array), expect.any(Function));
        expect(convertTaskToAppFormat).not.toHaveBeenCalled();
    });
});
import { selectTaskById } from './query';
import db from '@/lib/db/connection';
import { convertTaskToAppFormat } from '@/lib/utils';
import { DatabaseFormattedTask, Task } from '@/lib/types';


jest.mock('@/lib/utils', () => ({
    convertTaskToAppFormat: jest.fn(),
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
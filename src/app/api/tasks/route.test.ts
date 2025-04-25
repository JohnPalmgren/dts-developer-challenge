import { GET } from './route';
import { selectAllTasks } from '@/app/api/tasks/query';

jest.mock('@/app/api/tasks/query', () => ({
    selectAllTasks: jest.fn(),
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
import {
    formatDate,
    convertBoolToBin,
    convertBinToBool,
    convertTaskToAppFormat,
    convertTaskToDBFormat,
} from './utils';

describe('formatDate', () => {
    it('should format a date with "st" suffix for days ending in 1 (except 11)', () => {
        const date = new Date(2023, 3, 1, 16, 0); // April 1, 2023, 16:00
        expect(formatDate(date)).toBe('16:00 1st April 23');
    });

    it('should format a date with "nd" suffix for days ending in 2 (except 12)', () => {
        const date = new Date(2023, 3, 2, 9, 5); // April 2, 2023, 09:05
        expect(formatDate(date)).toBe('09:05 2nd April 23');
    });

    it('should format a date with "rd" suffix for days ending in 3 (except 13)', () => {
        const date = new Date(2023, 3, 3, 23, 59); // April 3, 2023, 23:59
        expect(formatDate(date)).toBe('23:59 3rd April 23');
    });

    it('should format a date with "th" suffix for days ending in 4-9, 0, or 11-13', () => {
        const date1 = new Date(2023, 3, 4, 12, 30); // April 4, 2023, 12:30
        const date2 = new Date(2023, 3, 11, 8, 15); // April 11, 2023, 08:15
        const date3 = new Date(2023, 3, 13, 14, 45); // April 13, 2023, 14:45
        expect(formatDate(date1)).toBe('12:30 4th April 23');
        expect(formatDate(date2)).toBe('08:15 11th April 23');
        expect(formatDate(date3)).toBe('14:45 13th April 23');
    });

    it('should format a date with the correct month name', () => {
        const date = new Date(2023, 0, 15, 10, 0); // January 15, 2023, 10:00
        expect(formatDate(date)).toBe('10:00 15th January 23');
    });

    it('should handle single-digit hours and minutes with leading zeros', () => {
        const date = new Date(2023, 5, 9, 5, 7); // June 9, 2023, 05:07
        expect(formatDate(date)).toBe('05:07 9th June 23');
    });
});

describe('convertBoolToBin', () => {
    it('should return 1 for true', () => {
        expect(convertBoolToBin(true)).toBe(1);
    });

    it('should return 0 for false', () => {
        expect(convertBoolToBin(false)).toBe(0);
    });
});

describe('convertBinToBool', () => {
    it('should return true for 1', () => {
        expect(convertBinToBool(1)).toBe(true);
    });

    it('should return false for 0', () => {
        expect(convertBinToBool(0)).toBe(false);
    });

   it('should throw an error for values other than 0 or 1', () => {
        expect(() => convertBinToBool(2)).toThrow("Invalid binary value. Expected 0 or 1.");
        expect(() => convertBinToBool(-1)).toThrow("Invalid binary value. Expected 0 or 1.");
        expect(() => convertBinToBool(100)).toThrow("Invalid binary value. Expected 0 or 1.");
   })
})

describe('convertTaskToAppFormat', () => {
    it('should convert database task to app format correctly', () => {

        const dateString = '2025-04-14T09:55:42.000Z'

        const taskFromDatabase = {
            id: 1,
            title: 'Test Task',
            description: 'This is a test task.',
            completed: 0,
            dueDate: dateString,
        };

        const convertedTask = {
            id: 1,
            title: 'Test Task',
            description: 'This is a test task.',
            completed: false,
            dueDate: new Date(dateString),
        };

        expect(convertTaskToAppFormat(taskFromDatabase)).toEqual(convertedTask);
    });

    it('should convert the object without a description present', () => {
        const dateString = '2025-04-14T09:55:42.000Z'

        const taskFromDatabase = {
            id: 1,
            title: 'Test Task',
            completed: 0,
            dueDate: dateString,
        };

        const convertedTask = {
            id: 1,
            title: 'Test Task',
            completed: false,
            dueDate: new Date(dateString),
        };

        expect(convertTaskToAppFormat(taskFromDatabase)).toEqual(convertedTask);
    })
})

describe('convertTaskToDBFormat', () => {
    it('should convert app task to database format correctly', () => {

        const dateString = '2025-04-14T09:55:42.000Z'
        const date = new Date(dateString);

        const taskFromApp = {
            id: 1,
            title: 'Test Task',
            description: 'This is a test task.',
            completed: false,
            dueDate: date,
        };

        const convertedTask = {
            id: 1,
            title: 'Test Task',
            description: 'This is a test task.',
            completed: 0,
            dueDate: dateString,
        };

        expect(convertTaskToDBFormat(taskFromApp)).toEqual(convertedTask);
    });

    it('should convert the object without a description present', () => {
        const dateString = '2025-04-14T09:55:42.000Z'
        const date = new Date(dateString);

        const taskFromApp = {
            id: 1,
            title: 'Test Task',
            completed: false,
            dueDate: date,
        };

        const convertedTask = {
            id: 1,
            title: 'Test Task',
            completed: 0,
            dueDate: dateString,
        };

        expect(convertTaskToDBFormat(taskFromApp)).toEqual(convertedTask);
    })
});


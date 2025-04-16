import {
    formatDateForDisplay,
    convertBoolToBin,
    convertBinToBool,
    convertTaskToAppFormat,
    convertTaskToDBFormat,
} from './utils';

describe('formatDate', () => {
    it('should format a date with "st" suffix for days ending in 1 (except 11)', () => {
        const date = new Date(2023, 3, 1); // April 1, 2023, 16:00
        expect(formatDateForDisplay(date)).toBe('1st April 23');
    });

    it('should format a date with "nd" suffix for days ending in 2 (except 12)', () => {
        const date = new Date(2023, 3, 2); // April 2, 2023, 09:05
        expect(formatDateForDisplay(date)).toBe('2nd April 23');
    });

    it('should format a date with "rd" suffix for days ending in 3 (except 13)', () => {
        const date = new Date(2023, 3, 3); // April 3, 2023
        expect(formatDateForDisplay(date)).toBe('3rd April 23');
    });

    it('should format a date with "th" suffix for days ending in 4-9, 0, or 11-13', () => {
        const date1 = new Date(2023, 3, 4); // April 4, 2023
        const date2 = new Date(2023, 3, 11); // April 11, 2023
        const date3 = new Date(2023, 3, 13); // April 13, 2023
        expect(formatDateForDisplay(date1)).toBe('4th April 23');
        expect(formatDateForDisplay(date2)).toBe('11th April 23');
        expect(formatDateForDisplay(date3)).toBe('13th April 23');
    });

    it('should format a date with the correct month name', () => {
        const date = new Date(2023, 0, 15); // January 15, 2023
        expect(formatDateForDisplay(date)).toBe('15th January 23');
    });

    it('should handle single-digit hours and minutes with leading zeros', () => {
        const date = new Date(2023, 5, 9); // June 9, 2023
        expect(formatDateForDisplay(date)).toBe('9th June 23');
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


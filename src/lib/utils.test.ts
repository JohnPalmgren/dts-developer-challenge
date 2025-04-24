import {
    formatDateForDisplay,
    formatDateToYYYYMMDD,
    convertBoolToBin,
    convertBinToBool,
    convertTaskToAppFormat,
    convertTaskToDBFormat,
    taskIsOverdue,
} from './utils';

describe('formatDateForDisplay', () => {
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

describe('formatDateToYYYYMMDD', () => {
    it('should format a date to YYYY-MM-DD', () => {
        const date = new Date(2025, 3, 14); // April 14, 2025
        expect(formatDateToYYYYMMDD(date)).toBe('2025-04-14');
    });

    it('should handle single-digit months and days with leading zeros', () => {
        const date = new Date(2024, 0, 5); // January 5, 2024
        expect(formatDateToYYYYMMDD(date)).toBe('2024-01-05');
    });
})

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

    it('should strip the description field if it is null', () => {
        const taskFromDatabase = {
            id: 1,
            title: 'Test Task',
            description: null,
            completed: 0,
            dueDate: '2025-04-14T09:55:42.000Z',
        };

        const expectedTask = {
            id: 1,
            title: 'Test Task',
            completed: false,
            dueDate: new Date('2025-04-14T09:55:42.000Z'),
        };

        expect(convertTaskToAppFormat(taskFromDatabase)).toEqual(expectedTask);
    });

    it('should not strip the description field if it is not null', () => {
        const taskFromDatabase = {
            id: 1,
            title: 'Test Task',
            description: 'This is a test task.',
            completed: 0,
            dueDate: '2025-04-14T09:55:42.000Z',
        };

        const expectedTask = {
            id: 1,
            title: 'Test Task',
            description: 'This is a test task.',
            completed: false,
            dueDate: new Date('2025-04-14T09:55:42.000Z'),
        };

        expect(convertTaskToAppFormat(taskFromDatabase)).toEqual(expectedTask);
    });
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
            description: null,
            dueDate: dateString,
        };

        expect(convertTaskToDBFormat(taskFromApp)).toEqual(convertedTask);
    })
});

describe('taskIsOverdue', () => {

    const MOCK_TODAY_DATE = new Date('2025-04-23T10:00:00.000Z');

    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(MOCK_TODAY_DATE);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('should return true for a date in the past (yesterday)', () => {
        const yesterday = new Date(MOCK_TODAY_DATE);
        yesterday.setDate(MOCK_TODAY_DATE.getDate() - 1); // Set to April 22, 2025
        expect(taskIsOverdue(yesterday)).toBe(true);
    });

    test('should return true for a date far in the past', () => {
        const lastYear = new Date(MOCK_TODAY_DATE);
        lastYear.setFullYear(MOCK_TODAY_DATE.getFullYear() - 1); // Set to April 23, 2024
        expect(taskIsOverdue(lastYear)).toBe(true);
    });

    test('should return false for a date that is today (same day, different time)', () => {
        // April 23, 2025, 08:00 AM (earlier than mock time)
        const todayEarly = new Date('2025-04-23T08:00:00.000Z');
        expect(taskIsOverdue(todayEarly)).toBe(false);

        // April 23, 2025, 14:00 PM (later than mock time)
        const todayLate = new Date('2025-04-23T14:00:00.000Z');
        expect(taskIsOverdue(todayLate)).toBe(false);
    });

    test('should return false for a date exactly at midnight today', () => {
        // April 23, 2025, 00:00:00.000
        const midnightToday = new Date('2025-04-23T00:00:00.000Z');
        expect(taskIsOverdue(midnightToday)).toBe(false);
    });


    test('should return false for a date in the future (tomorrow)', () => {
        const tomorrow = new Date(MOCK_TODAY_DATE);
        tomorrow.setDate(MOCK_TODAY_DATE.getDate() + 1); // Set to April 24, 2025
        expect(taskIsOverdue(tomorrow)).toBe(false);
    });

    test('should return false for a date far in the future', () => {
        const nextYear = new Date(MOCK_TODAY_DATE);
        nextYear.setFullYear(MOCK_TODAY_DATE.getFullYear() + 1); // Set to April 23, 2026
        expect(taskIsOverdue(nextYear)).toBe(false);
    });

    test('should return false for a date exactly at midnight tomorrow', () => {
        // April 24, 2025, 00:00:00.000
        const midnightTomorrow = new Date('2025-04-24T00:00:00.000Z');
        expect(taskIsOverdue(midnightTomorrow)).toBe(false);
    });

});


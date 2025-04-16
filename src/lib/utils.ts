import {
    DatabaseFormattedTask,
    DatabaseFormattedInputTask,
    TaskInput,
    Task
} from "@/lib/types";

/**
 * Formats a date object to a string in the format time day month year eg "16:00 9th April 25"
 * @param date - The date object to format
 * @returns A string representing the date in the specified format
 */
const formatDateForDisplay = (date: Date): string => {

    // Get the day of the month
    const day = date.getDate();

    // Add appropriate suffix to the day
    let daySuffix = 'th';
    if (day % 10 === 1 && day !== 11) {
        daySuffix = 'st';
    } else if (day % 10 === 2 && day !== 12) {
        daySuffix = 'nd';
    } else if (day % 10 === 3 && day !== 13) {
        daySuffix = 'rd';
    }

    // Get month name
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[date.getMonth()];

    // Get the last two digits of the year
    const year = date.getFullYear().toString().slice(-2);

    // Combine all parts into the desired format
    return `${day}${daySuffix} ${month} ${year}`;
}

/**
 * Formats a date object to a string in the format YYYY-MM-DD.
 *
 * @param {Date} date - The date object to format.
 * @returns {string} Returns the formatted date string in YYYY-MM-DD format.
 */
const formatDateToYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Converts a boolean value to its binary integer representation.
 * (true -> 1, false -> 0).
 *
 * @param {boolean} bool - The boolean value to convert.
 * @returns {number} Returns 1 if the input is true, otherwise 0.
 */
const convertBoolToBin = (bool: boolean): number => {
    return bool ? 1 : 0;
}

/**
 * Converts a binary integer representation back to its boolean equivalent.
 * Assumes 1 represents true and any other value represents false.
 *
 * @param {number} bin - The integer value (expected to be 0 or 1).
 * @returns {boolean} Returns true if the input is 1, otherwise false.
 */
const convertBinToBool = (bin: number): boolean => {
    if(bin > 1 || bin < 0) {
        throw new Error("Invalid binary value. Expected 0 or 1.");
    }
    return bin === 1;
}

/**
 * Converts a task from database format to application format.
 *
 * This function transforms a task object by:
 * - Converting `completed` from a binary value to a boolean.
 * - Converting `dueDate` from an ISO date string to a JavaScript Date object.
 *
 * @param {DatabaseFormattedTask} task - The task object using formats for the database.
 * @returns {Task} The task object with formatting used outside the database.
 */
const convertTaskToAppFormat = (task: DatabaseFormattedTask ): Task => {
    return {
        ...task,
        completed: convertBinToBool(task.completed),
        dueDate: new Date(task.dueDate)
    }
}

/**
 * Converts a task from application format to database format.
 *
 * This function is overloaded to take tasks typed with or without an ID field.
 * It transforms a task object by:
 * - Converting `completed` from a boolean to a binary value (0 or 1).
 * - Converting `dueDate` from a Date object to an ISO date string.
 *
 * @overload
 * @param {Task} task - The task object with ID in standard format.
 * @returns {DatabaseFormattedTask} The task formatted for database storage.
 *
 * @overload
 * @param {TaskInput} task - The task input object (before an ID is assigned) in standard format.
 * @returns {DatabaseFormattedInputTask} The task input without ID formatted for database storage.
 *
 * @param {Task | TaskInput} task - The task object in standard format.
 * @returns {DatabaseFormattedTask | DatabaseFormattedInputTask} The task values converted into a format for the database.
 */
function convertTaskToDBFormat(task: Task): DatabaseFormattedTask;
function convertTaskToDBFormat(task: TaskInput): DatabaseFormattedInputTask;
function convertTaskToDBFormat(task: Task | TaskInput): DatabaseFormattedTask | DatabaseFormattedInputTask {
    return {
        ...task,
        completed: convertBoolToBin(task.completed),
        dueDate: task.dueDate.toISOString()
    };
}

export {
    formatDateForDisplay,
    formatDateToYYYYMMDD,
    convertBoolToBin,
    convertBinToBool,
    convertTaskToAppFormat,
    convertTaskToDBFormat,
}
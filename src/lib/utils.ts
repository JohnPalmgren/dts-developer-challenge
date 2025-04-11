/**
 * Formats a date object to a string in the format time day month year eg "16:00 9th April 25"
 * @param date - The date object to format
 * @returns A string representing the date in the specified format
 */
 const formatDate = (date: Date): string => {
    // Get hours and minutes with leading zeros if needed
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

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
    return `${hours}:${minutes} ${day}${daySuffix} ${month} ${year}`;
}

export {
    formatDate
}
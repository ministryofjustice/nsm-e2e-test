/**
 * Converts a string or boolean value to boolean
 * @param {boolean|string} value - Value to convert
 * @returns {boolean} Converted boolean value
 * @throws {Error} If value is invalid
 * @example
 * convertToBoolean('true'); // returns true
 * convertToBoolean(false); // returns false
 */
export const convertToBoolean = (value) => {
    if (typeof value === 'boolean') {
        return value;
    }

    if (typeof value === 'string') {
        const normalized = value.toLowerCase();
        if (normalized !== 'true' && normalized !== 'false') {
            throw new Error('String value must be "true" or "false"');
        }
        return normalized === 'true';
    }

    throw new Error('Value must be a boolean or string');
};

export const fillDate = async (page, day, month, year) => {
    await page.getByRole('textbox', { name: 'Day' }).fill(day.toString());
    await page.getByRole('textbox', { name: 'Month' }).fill(month.toString());
    await page.getByRole('textbox', { name: 'Year' }).fill(year.toString());
};

export const formatDate = (dateObject) => {
    const date = new Date(dateObject.year, dateObject.month - 1, dateObject.day);
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
};
/**
 * Selects a radio button option and continues
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} name - Group name of the radio buttons
 * @param {string} value - Value to select ('Yes' or 'No')
 * @throws {Error} If selection fails or parameters are invalid
 * @returns {Promise<void>}
 * @example
 * await selectRadioButtonAndContinue(page, 'Is this a youth court?', 'Yes');
 * await selectRadioButtonAndContinue(page, 'Do you want to add another defendant?', 'No');
 */
export const selectRadioButton = async (page, name, value) => {
    if (!page) throw new Error('Page is required');
    if (!name) throw new Error('Group name is required');
    if (!['Yes', 'No'].includes(value)) {
        throw new Error('Value must be either "Yes" or "No"');
    }

    try {
        await page
            .getByRole('group', { name })
            .getByLabel(value, { exact: true })
            .check();
    } catch (error) {
        throw new Error(`Failed to select ${value} for "${name}": ${error.message}`);
    }
};
import { selectRadioButton } from '../../../helpers';

export default class CounselCodePage {

    /**
     * Creates an instance of CounselCodePage
     * @param {import('@playwright/test').Page} page - Playwright page object
     * @throws {Error} If page is not provided
     */
    constructor(page) {
        if (!page) throw new Error('Page is required');
        this.page = page;
    }

    /**
     * Selects a counsel code and continues to next step
     * @param {string|number} code - The counsel code to select (e.g., '12345')
     * @throws {Error} If code selection or button click fails
     * @returns {Promise<void>}
     * @example
     * await selectCounselCode('12345');
     */
    async selectCounselCode(code='1A123C') {
        if (!code) {
            throw new Error('Counsel code is required');
        }

        try {
           await this.page.getByLabel("What is the assigned counsel account number?").fill(code.toString());
           await this.page.getByRole('button', { name: 'Continue' }).click();
           await selectRadioButton(this.page, 'Is this the right account?', 'Yes');
           await this.page.getByRole('button', { name: 'Continue' }).click();
        } catch (error) {
            throw new Error(`Failed to select counsel code "${code}": ${error.message}`);
        }
    }

}
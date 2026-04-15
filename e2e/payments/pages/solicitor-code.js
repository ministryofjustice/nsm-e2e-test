import { selectRadioButton } from '../../../helpers';

export default class SolicitorCodePage {

    /**
     * Creates an instance of SolicitorCodePage
     * @param {import('@playwright/test').Page} page - Playwright page object
     * @throws {Error} If page is not provided
     */
    constructor(page) {
        if (!page) throw new Error('Page is required');
        this.page = page;
    }

    /**
     * Selects a solicitor code and continues to next step
     * @param {string|number} code - The solicitor code to select (e.g., '12345')
     * @throws {Error} If code selection or button click fails
     * @returns {Promise<void>}
     * @example
     * await selectSolicitorCode('12345');
     */
    async selectSolicitorCode(code='1A123B') {
        if (!code) {
            throw new Error('Solicitor code is required');
        }

        try {
           await this.page.getByLabel("What is the solicitor's firm account number?").fill(code.toString());
           await this.page.getByRole('button', { name: 'Continue' }).click();
           await selectRadioButton(this.page, 'Is this the right account?', 'Yes');
           await this.page.getByRole('button', { name: 'Continue' }).click();
        } catch (error) {
            throw new Error(`Failed to select solicitor code "${code}": ${error.message}`);
        }
    }

}
import { selectRadioButton } from '../../../helpers/';

export default class ClaimTypePage {

    /**
     * Creates an instance of ClaimTypePage
     * @param {import('@playwright/test').Page} page - Playwright page object
     * @throws {Error} If page is not provided
     */
    constructor(page) {
        if (!page) throw new Error('Page is required');
        this.page = page;
    }

    /**
     * Selects a claim type and continues to next step
     * @param {string|number} type - The type to select (e.g., 'Assigned counsel')
     * @throws {Error} If type selection or button click fails
     * @returns {Promise<void>}
     * @example
     * await selectClaimType('Assigned counsel');
     */
    async selectClaimType(type) {
        if (!type) {
            throw new Error('Claim type is required');
        }

        try {
            await selectRadioButton(this.page, 'Claim type', type);
            await this.page.getByRole('button', { name: 'Continue' }).click();
        } catch (error) {
            throw new Error(`Failed to select claim type "${type}": ${error.message}`);
        }
    }

}
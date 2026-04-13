import { paymentData } from '../../../helpers';

export default class ClaimCostsPage {
     /**
     * Creates an instance of ClaimCostsPage
     * @param {import('@playwright/test').Page} page - Playwright page object
     * @throws {Error} If page is not provided
     */
    constructor(page) {
        if (!page) throw new Error('Page is required');
        this.page = page;
    }

    /**
     * Fills in the cost fields and continues to next step
     * @throws {Error} If filling in claim details or button click fails
     * @returns {Promise<void>}
     * @example
     * await fillCosts();
     */
    async fillCosts() {
        try {
            await this.page.locator('#counsel_costs_net').click();
            await this.page.locator('#counsel_costs_net').fill(paymentData.acCosts.netCounselFees);
            await this.page.locator('#counsel_costs_vat').click();
            await this.page.locator('#counsel_costs_vat').fill(paymentData.acCosts.vatCounselFees);
            await this.page.getByRole('button', { name: 'Continue' }).click();       
        } catch (error) {
            throw new Error(`Failed to fill claim details: ${error.message}`);
        }
    }
}
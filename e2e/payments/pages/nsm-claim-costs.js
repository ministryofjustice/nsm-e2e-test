import { paymentData } from '../../../helpers';

export default class NsmClaimCostsPage {
     /**
     * Creates an instance of NsmClaimCostsPage
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
            await this.page.locator('#profit_costs').click();
            await this.page.locator('#profit_costs').fill(paymentData.nsmCosts.profitCosts);
            await this.page.locator('#disbursement_costs').click();
            await this.page.locator('#disbursement_costs').fill(paymentData.nsmCosts.disbursementCosts);
            await this.page.locator('#travel_costs').click();
            await this.page.locator('#travel_costs').fill(paymentData.nsmCosts.travelCosts);
            await this.page.locator('#waiting_costs').click();
            await this.page.locator('#waiting_costs').fill(paymentData.nsmCosts.waitingCosts);
            await this.page.getByRole('button', { name: 'Continue' }).click();       
        } catch (error) {
            throw new Error(`Failed to fill claim details: ${error.message}`);
        }
    }
}
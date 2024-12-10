export default class EligibleYouthCourtFeePage {

    /**
     * Creates an instance of EligibleYouthCourtFeePage
     * @param {import('@playwright/test').Page} page - Playwright page object
     * @throws {Error} If page is not provided
     */
    constructor(page) {
        if (!page) throw new Error('Page is required');
        this.page = page;
    }

    /**
    * Selects whether to claim youth court fee and continues
    * @param {boolean} claimFee - Whether to claim the youth court fee
    * @throws {Error} If selection or button click fails
    * @returns {Promise<void>}
    * @example
    * await claimYouthCourtFee(true); // Select Yes
    * await claimYouthCourtFee(false); // Select No
    */
    async claimYouthCourtFee(claimFee) {
        try {
            claimFee ?
                await this.page.getByText('Yes').click() :
                await this.page.getByText('No').click();
            await this.page.getByRole('button', { name: 'Save and continue' }).click();
        } catch (error) {
            throw new Error(`Failed to select youth court fee option: ${error.message}`);
        }
    }

}
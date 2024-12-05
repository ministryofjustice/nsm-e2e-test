export default class ClaimReasonPage {

    /**
     * Creates an instance of ClaimReasonPage
     * @param {import('@playwright/test').Page} page - Playwright page object
     * @throws {Error} If page is not provided
     */
    constructor(page) {
        if (!page) throw new Error('Page is required');
        this.page = page;
    }

    /**
     * Selects a claim reason and continues to next step
     * @param {string|number} reason - The reason to select (e.g., 'Enhanced rates claimed')
     * @throws {Error} If reason selection or button click fails
     * @returns {Promise<void>}
     * @example
     * await selectClaimReason('Enhanced rates claimed');
     */
    async selectClaimReason(reason) {
        if (!reason) {
            throw new Error('Claim reason is required');
        }

        try {
            await this.page.getByLabel(reason.toString()).check();
            await this.page.getByRole('button', { name: 'Save and continue' }).click();
        } catch (error) {
            throw new Error(`Failed to select claim reason "${reason}": ${error.message}`);
        }
    }

}
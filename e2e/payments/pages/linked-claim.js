export default class LinkedClaimPage {

    /**
     * Creates an instance of LinkedClaimPage
     * @param {import('@playwright/test').Page} page - Playwright page object
     * @throws {Error} If page is not provided
     */
    constructor(page) {
        if (!page) throw new Error('Page is required');
        this.page = page;
    }

    /**
     * Selects a claim laa reference (or creates a new record) and continues to next step
     * @param {string|number} laaReference - The LAA reference to select (e.g., 'Assigned counsel')
     * @throws {Error} If laa reference search or button click fails
     * @returns {Promise<void>}
     * @example
     * await selectLinkedClaim('<LAA Reference>');
     */
    async selectLinkedClaim(laaReference) {
        try {
            if(laaReference){
                await this.page.getByLabel('Find a claim').fill(laaReference.toString());
                await this.page.getByRole('button', { name: 'Search' }).click();
            }
            else{
                await this.page.getByRole('button', { name: 'Create a new record' }).click();
            }
        } catch (error) {
            throw new Error(`Failed to select choose a linked claim: ${error.message}`);
        }
    }

}
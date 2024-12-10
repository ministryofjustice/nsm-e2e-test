export default class CaseOutcomePage {

    constructor(page) {
        this.page = page;
    }

    /**
     * Selects a case outcome and continues to next step
     * @param {string} outcome - The outcome to select (e.g., 'Guilty plea')
     * @throws {Error} If outcome selection or button click fails
     * @returns {Promise<void>}
     * @example
     * await selectCaseOutcome('Guilty plea');
     */
    async selectCaseOutcome(outcome) {
        if (!outcome) {
            throw new Error('Case outcome is required');
        }

        try {
            await this.page.getByLabel(outcome, { exact: true }).check();
            await this.page.getByRole('button', { name: 'Save and continue' }).click();
        } catch (error) {
            throw new Error(`Failed to select case outcome "${outcome}": ${error.message}`);
        }
    }

}
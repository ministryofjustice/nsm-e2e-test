export default class ClaimReasonPage {

    constructor(page) {
        this.page = page;
    }

    async selectClaimReason() {
        await this.page.getByLabel('Enhanced rates claimed').check();
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}
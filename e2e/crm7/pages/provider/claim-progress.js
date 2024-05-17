export default class YouClaimProgressPage {

    constructor(page) {
        this.page = page;
    }

    async clickOnYourDetails() {
        await this.page.getByRole('link', { name: 'Firm details' }).click();
    }

}
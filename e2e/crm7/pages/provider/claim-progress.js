export default class YouClaimProgressPage {

    constructor(page) {
        this.page = page;
    }

    async clickOnYourDetails() {
        await this.page.getByRole('link', { name: 'Your details' }).click();
    }

}
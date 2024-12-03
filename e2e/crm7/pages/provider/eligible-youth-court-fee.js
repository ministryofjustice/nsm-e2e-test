export default class EligibleYouthCourtFeePage {

    constructor(page) {
        this.page = page;
    }

    async claimYouthCourtFee(claimFee) {
        claimFee ? await this.page.getByText('Yes').click() : await this.page.getByText('No').click();
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}
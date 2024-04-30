export default class ApplyingTotalAmountPage {

    constructor(page) {
        this.page = page;
    }
    async fillApplyingTotalAmountForm(answer) {
        answer = answer.toString();
        await this.page.getByLabel('Yes').check();
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}

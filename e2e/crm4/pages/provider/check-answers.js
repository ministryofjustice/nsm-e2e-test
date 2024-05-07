export default class CheckAnswersPage {

    constructor(page) {
        this.page = page;
    }
    async fillCheckAnswersForm() {
        await this.page.getByLabel('I confirm that all costs are').check();
        await this.page.getByLabel('I confirm that any travel').check();
        await this.page.getByRole('button', { name: 'Accept and send' }).click();
    }

}
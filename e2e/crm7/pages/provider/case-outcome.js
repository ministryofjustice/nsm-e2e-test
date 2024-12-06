export default class CaseOutcomePage {

    constructor(page) {
        this.page = page;
    }

    async selectCaseOutcome() {
        await this.page.getByLabel('Guilty plea', { exact: true }).check();
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}
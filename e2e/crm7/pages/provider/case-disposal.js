export default class CaseDisposalPage {

    constructor(page) {
        this.page = page;
    }

    async selectCaseDisposal() {
        await this.page.getByLabel('Guilty plea', { exact: true }).check();
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}
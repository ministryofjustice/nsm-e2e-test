export default class CaseCategoryPage {

    constructor(page) {
        this.page = page;
    }

    async selectCaseCategory(category) {
        await this.page.getByText(category).click();
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}
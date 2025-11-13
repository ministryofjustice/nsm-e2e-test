import { nsmData } from '../../../../helpers/index'
export default class ClaimDetailsPage {

    constructor(page) {
        this.page = page;
    }

    async fillClaimDetails() {
        await this.page.getByLabel('Number of pages of prosecution evidence').fill(nsmData.evidencePages.prosecution);
        await this.page.getByLabel('Number of pages of defence').fill(nsmData.evidencePages.defence);
        await this.page.getByLabel('Number of witnesses').fill(nsmData.witnesses);
        await this.page.getByRole('group', { name: 'Did you spend time watching' }).getByLabel('No').check();
        await this.page.getByRole('group', { name: 'Did you do any work before' }).getByLabel('No').check();
        await this.page.getByRole('group', { name: 'Did you do any further work' }).getByLabel('No').check();
        let workCompletedDate = this.page.locator('.govuk-form-group:has-text("Date work was completed")');
        await workCompletedDate.getByRole('textbox', { name: 'Day' }).fill('1');
        await workCompletedDate.getByRole('textbox', { name: 'Month' }).fill('1');
        await workCompletedDate.getByRole('textbox', { name: 'Year' }).fill('2024');
        await this.page.getByRole('group', { name: 'Have wasted costs been' }).getByLabel('No').check();
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}

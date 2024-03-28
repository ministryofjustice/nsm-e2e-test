import { formData } from '../../../../helpers/index'
export default class ClaimDetailsPage {

    constructor(page) {
        this.page = page;
    }

    async fillClaimDetails() {
        await this.page.getByLabel('Number of pages of prosecution evidence').fill(formData.evidence_pages.prosecution);
        await this.page.getByLabel('Number of pages of defence').fill(formData.evidence_pages.defence);
        await this.page.getByLabel('Number of witnesses').fill(formData.witnesses);
        await this.page.getByRole('group', { name: 'Does this bill represent a' }).getByLabel('No').check();
        await this.page.getByRole('group', { name: 'Did you spend time watching' }).getByLabel('No').check();
        await this.page.getByRole('group', { name: 'Did you do any work before' }).getByLabel('No').check();
        await this.page.getByRole('group', { name: 'Did you do any further work' }).getByLabel('No').check();
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}
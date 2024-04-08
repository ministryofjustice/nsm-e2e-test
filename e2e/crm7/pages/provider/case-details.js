import { fillDate, formData } from '../../../../helpers/index'
export default class CasesDetailsPage {

    constructor(page) {
        this.page = page;
    }

    async fillCaseDetails() {
        await this.page.getByLabel('Main offence').fill('crim');
        await this.page.getByRole('option', { name: 'Criminal Damage Criminal Damage and Arson', exact: true }).click();
        await fillDate(this.page, formData.mainOffenceDate.day, formData.mainOffenceDate.month, formData.mainOffenceDate.year);
        await this.page.getByRole('group', { name: 'Was there an assigned counsel?' }).getByLabel('No').check();
        await this.page.getByRole('group', { name: 'Was there an unassigned' }).getByLabel('No').check();
        await this.page.getByRole('group', { name: 'Was there an instructed agent?' }).getByLabel('No').check();
        await this.page.getByRole('group', { name: 'Has the case been remitted' }).getByLabel('No').check();
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}

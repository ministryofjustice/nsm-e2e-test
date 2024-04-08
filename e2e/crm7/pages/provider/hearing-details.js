import { formData, fillDate } from '../../../../helpers/index'
export default class HearingDetailsPage {

    constructor(page) {
        this.page = page;
    }

    async fillHearingDetails() {
        await fillDate(this.page, formData.hearing_date.day, formData.hearing_date.month, formData.hearing_date.year);
        await this.page.getByLabel('How many hearings were held').fill(formData.hearing_count);
        await this.page.getByLabel('Which court was the last case').fill('Lon');
        await this.page.getByRole('option', { name: "City of London Magistrates' Court" }).click();
        await this.page.getByRole('group', { name: 'Is this court in a designated' }).getByLabel('No').check();
        await this.page.getByRole('group', { name: 'Is this court a youth court?' }).getByLabel('No').check();
        await this.page.getByLabel('Hearing outcome').fill(formData.hearing_outcome);
        await this.page.getByRole('option', { name: 'CP19 - Deferred sentence' }).click();
        // Selecting Matter type 9 - Public order offences
        await this.page.getByLabel('Matter type').fill(formData.matter_type);
        await this.page.getByLabel('Matter type').press('Tab');
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}
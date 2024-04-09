import { formData, fillDate } from '../../../../helpers/index'
export default class HearingDetailsPage {

    constructor(page) {
        this.page = page;
    }

    async fillHearingDetails() {
        await fillDate(this.page, formData.hearingDate.day, formData.hearingDate.month, formData.hearingDate.year);
        await this.page.getByLabel('How many hearings were held').fill(formData.hearingCount);
        await this.page.getByLabel('Which court was the last case').fill('Lon');
        await this.page.getByRole('option', { name: "City of London Magistrates' Court" }).click();
        await this.page.getByRole('group', { name: 'Is this court in a designated' }).getByLabel('No').check();
        await this.page.getByRole('group', { name: 'Is this court a youth court?' }).getByLabel('No').check();
        await this.page.getByLabel('Hearing outcome').fill(formData.hearingOutcome);
        await this.page.getByRole('option', { name: 'CP19 - Deferred sentence' }).click();
        // Selecting Matter type 9 - Public order offences
        await this.page.getByLabel('Matter type').fill(formData.matterType);
        await this.page.getByLabel('Matter type').press('Tab');
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}

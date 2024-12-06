import { nsmData, fillDate } from '../../../../helpers/index'
export default class HearingDetailsPage {

    constructor(page) {
        this.page = page;
    }

    async fillHearingDetails(youthCourt) {
        await fillDate(this.page, nsmData.hearingDate.day, nsmData.hearingDate.month, nsmData.hearingDate.year);
        await this.page.getByLabel('How many hearings were held').fill(nsmData.hearingCount);
        await this.page.getByLabel('Which court was the first case').fill('Aberconwy');
        await this.page.getByRole('option', { name: "Aberconwy PSD - C3237" }).click();

        youthCourt
            ? await this.page.getByRole('group', { name: 'Is this court a youth court?' }).getByLabel('Yes').check()
            : await this.page.getByRole('group', { name: 'Is this court a youth court?' }).getByLabel('No').check();

        await this.page.getByLabel('Hearing outcome').fill(nsmData.hearingOutcome);
        await this.page.getByRole('option', { name: 'CP19 - Deferred sentence' }).click();
        // Selecting Matter type 9 - Public order offences
        await this.page.getByLabel('Matter type').fill(nsmData.matterType);
        await this.page.getByLabel('Matter type').press('Tab');
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}

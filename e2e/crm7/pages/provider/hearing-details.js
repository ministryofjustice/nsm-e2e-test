import { nsmData, fillDate } from '../../../../helpers/index'
export default class HearingDetailsPage {

    /**
     * Creates an instance of EligibleYouthCourtFeePage
     * @param {import('@playwright/test').Page} page - Playwright page object
     * @throws {Error} If page is not provided
     */
    constructor(page) {
        if (!page) throw new Error('Page is required');
        this.page = page;
    }

    /**
 * Fills the hearing details form
 * @param {boolean} youthCourt - Whether the court is a youth court
 * @throws {Error} If form filling fails
 * @returns {Promise<void>}
 * @example
 * await fillHearingDetails(true); // For youth court
 * await fillHearingDetails(false); // For non-youth court
 */
    fillHearingDetailsWithYouthCourt = async (youthCourt) => {
        try {
            await fillDate(
                this.page,
                nsmData.hearingDate.day,
                nsmData.hearingDate.month,
                nsmData.hearingDate.year
            );

            await this.page.getByLabel('How many hearings were held').fill(nsmData.hearingCount);
            await this.page.getByLabel('Which court was the first case').fill('Aberconwy');
            await this.page.getByRole('option', { name: "Aberconwy PSD - C3237" }).click();

            // Youth court selection
            await this.page
                .getByRole('group', { name: 'Is this court a youth court?' })
                .getByLabel(youthCourt ? 'Yes' : 'No')
                .check();

            await this.page.getByLabel('Hearing outcome').fill(nsmData.hearingOutcome);
            await this.page.getByRole('option', { name: 'CP19 - Deferred sentence' }).click();

            // Matter type selection
            await this.page.getByLabel('Matter type').fill(nsmData.matterType);
            await this.page.getByLabel('Matter type').press('Tab');

            await this.page.getByRole('button', { name: 'Save and continue' }).click();
        } catch (error) {
            throw new Error(`Failed to fill hearing details: ${error.message}`);
        }
    };

}

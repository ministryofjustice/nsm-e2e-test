import { paymentData, selectRadioButton } from '../../../helpers';

export default class ClaimDetailsPage {
     /**
     * Creates an instance of ClaimDetailsPage
     * @param {import('@playwright/test').Page} page - Playwright page object
     * @throws {Error} If page is not provided
     */
    constructor(page) {
        if (!page) throw new Error('Page is required');
        this.page = page;
    }

    /**
     * Fills in the claim details and continues to next step
     * @param {string|number} claimType - The type to select (e.g., 'Assigned counsel')
     * @param {boolean} linkedClaim - Indicates if the claim is linked or not (e.g. true for an Assigned Counsel linked to an NSM claim)
     * @throws {Error} If filling in claim details or button click fails
     * @returns {Promise<void>}
     * @example
     * await fillClaimDetails('Assigned counsel');
     */
    async fillClaimDetails(claimType, linkedClaim) {
        if (!claimType) {
            throw new Error('Claim type is required');
        }
        if(typeof linkedClaim === 'undefined') {
            throw new Error('Linked claim status is required');
        }

        try {
            if(claimType === "Non-Standard Magistrates'" && !linkedClaim){
                await this.page.getByLabel('Date claim assessed').click();
                await this.page.getByLabel('Date claim assessed').fill(paymentData.nsmClaimDetails.dateAssessed);
                await this.page.getByLabel('Unique file number').click();
                await this.page.getByLabel('Unique file number').fill(paymentData.nsmClaimDetails.ufn);
                await selectRadioButton(this.page, 'Stage reached', paymentData.nsmClaimDetails.stageReached);
                await this.page.getByLabel('Defendant first name').click();
                await this.page.getByLabel('Defendant first name').fill(paymentData.nsmClaimDetails.defendantFirstName);
                await this.page.getByLabel('Defendant last name').click();
                await this.page.getByLabel('Defendant last name').fill(paymentData.nsmClaimDetails.defendantLastName);
                await this.page.getByLabel('Number of defendants').click();
                await this.page.getByLabel('Number of defendants').fill(paymentData.nsmClaimDetails.noOfDefendants.toString());
                await this.page.getByLabel('Number of attendances').click();
                await this.page.getByLabel('Number of attendances').fill(paymentData.nsmClaimDetails.noOfAttendances.toString());
                await this.page.getByLabel('Hearing outcome code').click();
                await this.page.getByLabel('Hearing outcome code').fill(paymentData.nsmClaimDetails.hearingOutcome);
                await this.page.getByLabel('Matter type').click();
                await this.page.getByLabel('Matter type').fill(paymentData.nsmClaimDetails.matterType);
                await this.page.getByLabel('Court').click();
                await this.page.getByLabel('Court').fill(paymentData.nsmClaimDetails.court);
                await this.page.getByLabel('Date work completed').click();
                await this.page.getByLabel('Date work completed').fill(paymentData.nsmClaimDetails.dateCompleted);
                await selectRadioButton(this.page, 'Is this court a youth court', 'Yes'); //Doesn't work when this step is not last for some reason 
            }
            else if(claimType === 'Assigned counsel' && !linkedClaim){
                await this.page.getByLabel('Date claim assessed').click();
                await this.page.getByLabel('Date claim assessed').fill(paymentData.acClaimDetails.dateAssessed);
                await this.page.getByLabel('Unique file number').click();
                await this.page.getByLabel('Unique file number').fill(paymentData.acClaimDetails.ufn);
                await this.page.getByLabel('Defendant last name').click();
                await this.page.getByLabel('Defendant last name').fill(paymentData.acClaimDetails.defendantLastName);
                await this.page.getByLabel('Counsel office account number').click();
                await this.page.getByLabel('Counsel office account number').fill(paymentData.acClaimDetails.counselNumber);
                await this.page.getByLabel('Counsel name').click();
                await this.page.getByLabel('Counsel name').fill(paymentData.acClaimDetails.counselName);
            }
            
            await this.page.getByRole('button', { name: 'Continue' }).click();
        } catch (error) {
            throw new Error(`Failed to fill claim details: ${error.message}`);
        }
    }    
}
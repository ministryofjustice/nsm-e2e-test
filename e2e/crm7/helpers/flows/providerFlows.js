import { storeLAAReference } from '../../../../helpers';
export class ProviderFlows {
    constructor(page, providerHelper, expectations, globalHelper) {
        this.page = page;
        this.helper = providerHelper;
        this.expectations = expectations;
        this.globalHelper = globalHelper;
    }

    /**
    * Completes all details for the claim
    * @param {string} scenarioName - Name of the scenario
    * @param {boolean} [withBoi=false] - Whether the claim is with Breach of Injunction (BOI)
    * @throws {Error} If any step fails
    * @returns {Promise<void>}
    * @example
    * await completeDetails('scenarioName'); // Without BOI
    * await completeDetails('scenarioName', true); // With BOI
    */
    async completeDetails(scenarioName, withBOI = false) {
        await this.expectations.heading('Your claim progress');
        const laaReference = await this.globalHelper.getLAAReference();
        await storeLAAReference(this.page, laaReference, scenarioName);

        await this.helper.clickOnFirmDetails();
        await this.expectations.heading('Firm details');
        await this.helper.fillUpFirmDetails();

        await this.expectations.heading('Contact details');
        await this.helper.fillUpContactDetails();

        await this.expectations.heading('Defendant 1 (lead defendant)');
        if (withBOI) {
            await this.helper.addDefendantDetailsWithBoi();
        } else {
            await this.helper.addDefendantDetails();
        }
        await this.expectations.heading('Defendants');
        await this.expectations.cellText('Lex Luthor');
        await this.helper.selectNoMoreDefendants();

        await this.expectations.heading('Case details');
        await this.helper.fillUpCaseDetails();

        await this.expectations.heading('Hearing details');
        await this.helper.fillUpHearingDetailsWithYouthCourt(true);
    }

    async completeWorkItemsAndDisbursements(expectedAmount) {
        await this.helper.fillUpClaimDetails();
        await this.expectations.heading('What work item are you');
        await this.helper.fillUpOneWorkItems();
        await this.expectations.heading('Letters and phone calls');
        await this.helper.fillUpLettersAndCalls();
        await this.helper.addNoDisbursements();
        await this.expectations.heading('Check your payment claim');
        await this.expectations.heading(expectedAmount);
        await this.globalHelper.clickOnButton('Save and continue', 'link');
    }

    /**
     * Completes other relevant information, uploads supporting evidence, and submits the claim
     * @param {string} filePath - Path to the file to upload as supporting evidence
     * @param {string[]} expectedAnswers - Array of expected texts to check on the "Check your answers" page
     * @throws {Error} If any step fails or parameters are invalid
     * @returns {Promise<void>}
     * @example
     * await completeOtherInformationAndSubmit('./e2e/fixtures/files/test.png', [
     *   'Breach of injunction',
     *   'Category 1B',
     *   'Guilty plea',
     *   'Test Automate'
     * ]);
     */
    checkAnswersAndSubmit = async (expectedAnswers) => {
        if (!Array.isArray(expectedAnswers)) {
            throw new Error('Expected answers must be an array');
        }
        await this.expectations.heading('Check your answers');
        await this.helper.checkYourAnswers(expectedAnswers);

        await this.expectations.heading('Equality monitoring questions');
        await this.helper.skipEqualityQuestions();

        await this.expectations.heading('Confirm the following');
        await this.helper.confirmAndSubmitNSMClaim();
    }
}

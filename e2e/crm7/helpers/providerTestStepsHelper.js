import {
    YourClaimsPage,
    WhatAreYouClaimingPage,
    YouClaimProgressPage,
    YourDetailsPage,
    ContactDetailsPage,
    FirmAccountNumberPage,
    DefendantDetailsPage,
    CasesDetailsPage,
    HearingDetailsPage,
    CaseCategoryPage,
    CaseOutcomePage,
    EligibleYouthCourtFeePage,
    ClaimReasonPage,
    ClaimDetailsPage,
    WorkItemPage
} from '../pages/provider';
import { convertToBoolean, selectRadioButton } from '../../../helpers';
import { ExpectationHelper } from './expectationHelper';
import { GlobalHelper } from '../../../helpers/globalHelper';
import { providerPageMap } from '../../../helpers';

export class ProviderTestStepsHelper {
    constructor(page) {
        if (!page) throw new Error('Page is required');
        this.page = page;
        this.globalHelper = new GlobalHelper(page, providerPageMap);
        this.expectations = new ExpectationHelper(page);
    }


    /**
     * Fills the claim type form using the specified function
     * @param {string} functionName - Name of the function to call
     * (e.g., 'fillClaimFormPostDecWithoutBOI', 'fillClaimFormPostDecWithBOI', 'fillClaimForm')
     * @throws {Error} If functionName is not provided or invalid
     * @returns {Promise<void>}
     * @example
     * await fillClaimType('fillClaimFormPostDecWithoutBOI');
     */
    fillClaimType = async (functionName) => {
        if (!functionName) {
            throw new Error('Function name is required');
        }

        const whatAreYouClaimingPage = new WhatAreYouClaimingPage(this.page);

        if (typeof whatAreYouClaimingPage[functionName] !== 'function') {
            throw new Error(`Invalid function name: ${functionName}`);
        }

        try {
            await whatAreYouClaimingPage[functionName]();
            await this.page.getByRole('button', { name: 'Save and continue' }).click();
        } catch (error) {
            throw new Error(`Failed to execute ${functionName}: ${error.message}`);
        }
    }

    /**
     * Selects Firm office account Number
    */
    fillAccountNumber = async () => {
        const firmAccountNumberPage = new FirmAccountNumberPage(this.page);
        await firmAccountNumberPage.fillFirmAccountNumberForm();
    };

    /**
     * Selects the office area and saves the selection
     * @param {string} data - The office area option to select (e.g., 'No')
     * @throws {Error} If data is not provided or selection fails
     * @returns {Promise<void>}
     * @example
     * await selectOfficeArea(nsmData.officeInUndesignatedArea);
     */
    selectOfficeArea = async (data) => {
        if (!data) {
            throw new Error('Office area selection data is required');
        }

        try {
            await this.page.getByText(data, { exact: true }).click();
            await this.page.getByRole('button', { name: 'Save and continue' }).click();
        } catch (error) {
            throw new Error(`Failed to select office area: ${error.message}`);
        }
    };

    clickOnFirmDetails = async () => {
        const yourClaimProgressPage = new YouClaimProgressPage(this.page);
        await yourClaimProgressPage.clickOnYourDetails();
    };

    fillUpFirmDetails = async () => {
        const yourDetails = new YourDetailsPage(this.page);
        await yourDetails.fillYourDetails();
    };

    fillUpContactDetails = async () => {
        const contactDetails = new ContactDetailsPage(this.page);
        await contactDetails.fillContactDetails();
    };

    addDefendantDetails = async () => {
        const defendantDetails = new DefendantDetailsPage(this.page);
        await defendantDetails.addDefendant();
    };

    addDefendantDetailsWithBoi = async () => {
        const defendantDetails = new DefendantDetailsPage(this.page);
        await defendantDetails.addDefendantWithBoi();
    };
    /**
     * Selects 'No' for adding another defendant and continues
     * @throws {Error} If selection or button click fails
     * @returns {Promise<void>}
     * @example
     * await selectNoMoreDefendants();
     */
    selectNoMoreDefendants = async () => {
        try {
            await this.page
                .getByRole('group', { name: 'Do you want to add another defendant?' })
                .getByLabel('No')
                .check();

            await this.globalHelper.clickOnButton('Save and continue');
        } catch (error) {
            throw new Error(`Failed to select no more defendants: ${error.message}`);
        }
    };

    fillUpCaseDetails = async () => {
        const caseDetails = new CasesDetailsPage(this.page);
        await caseDetails.fillCaseDetails();
    };

    /**
     * Fills hearing details form with youth court option
     * @param {boolean|string} youthCourt - Whether it's a youth court case ('true'/'false' or boolean)
     * @throws {Error} If youthCourt parameter is invalid
     * @returns {Promise<void>}
     * @example
     * await fillUpHearingDetailsWithYouthCourt(true);
     * await fillUpHearingDetailsWithYouthCourt('true');
     */
    fillUpHearingDetailsWithYouthCourt = async (youthCourt) => {
        // Convert to boolean if string
        const isYouthCourt = convertToBoolean(youthCourt)
        try {
            const hearingDetails = new HearingDetailsPage(this.page);
            await hearingDetails.fillHearingDetailsWithYouthCourt(isYouthCourt);
        } catch (error) {
            throw new Error(`Failed to fill hearing details: ${error.message}`);
        }
    };

    /**
     * Selects a case category from the available options
     * @param {string|number} category - The category to select (e.g., '1A', '2B')
     * @throws {Error} If category selection fails or parameter is invalid
     * @returns {Promise<void>}
     * @example
     * await selectCaseCategory('1A');
     * await selectCaseCategory(2);
     */
    selectCaseCategory = async (category) => {
        if (!category) {
            throw new Error('Category parameter is required');
        }

        try {
            const caseCategory = new CaseCategoryPage(this.page);
            await caseCategory.selectCaseCategory(category.toString());
        } catch (error) {
            throw new Error(`Failed to select case category ${category}: ${error.message}`);
        }
    };

    /**
     * Selects a case outcome and proceeds to next step
     * @param {string} outcome - The case outcome to select (e.g., 'Guilty plea')
     * @throws {Error} If outcome selection fails or parameter is invalid
     * @returns {Promise<void>}
     * @example
     * await selectCaseOutcome('Guilty plea');
     */
    selectCaseOutcome = async (outcome) => {
        if (!outcome) {
            throw new Error('Case outcome is required');
        }

        try {
            const caseOutcome = new CaseOutcomePage(this.page);
            await caseOutcome.selectCaseOutcome(outcome.toString());
        } catch (error) {
            throw new Error(`Failed to select case outcome "${outcome}": ${error.message}`);
        }
    };

    /**
     * Claims youth court fee by selecting Yes/No option
     * @param {boolean} claimFee - Whether to claim the youth court fee
     * @throws {Error} If selection fails or parameter is invalid
     * @returns {Promise<void>}
     * @example
     * await claimYouthCourtFee(true); // Select Yes
     * await claimYouthCourtFee(false); // Select No
     */
    claimYouthCourtFee = async (claimingFee) => {
        // Convert to boolean if string
        const isClaimingFee = convertToBoolean(claimingFee)

        try {
            const eligibleYouthCourtFee = new EligibleYouthCourtFeePage(this.page);
            await eligibleYouthCourtFee.claimYouthCourtFee(isClaimingFee);
        } catch (error) {
            throw new Error(`Failed to claim youth court fee: ${error.message}`);
        }
    };

    /**
     * Selects a claim reason and proceeds to next step
     * @param {string|number} reason - The reason to select (e.g., 'Complexity', 1)
     * @throws {Error} If reason selection fails or parameter is invalid
     * @returns {Promise<void>}
     * @example
     * await selectClaimReason('Complexity');
     * await selectClaimReason(1);
     */
    selectClaimReason = async (reason) => {
        if (!reason) {
            throw new Error('Claim reason is required');
        }

        try {
            const claimReasonPage = new ClaimReasonPage(this.page);
            await claimReasonPage.selectClaimReason(reason.toString());
        } catch (error) {
            throw new Error(`Failed to select claim reason "${reason}": ${error.message}`);
        }
    };

    fillUpClaimDetails = async () => {
        const claimDetails = new ClaimDetailsPage(this.page);
        await claimDetails.fillClaimDetails();
    };

    fillUpOneWorkItems = async () => {
        const workItem = new WorkItemPage(this.page);
        await workItem.fillWorkItem();
        await this.expectations.heading("Work items");
        await this.expectations.text('28 May 2015');
        await this.expectations.cellText('Preparation');
        await selectRadioButton(this.page, 'Do you want to add another work item?', 'No');
        await this.globalHelper.clickOnButton('Save and continue');
    };

    fillUpLettersAndCalls = async () => {
        await this.page.getByLabel('Number of letters (optional)').fill('10');
        await this.page.getByLabel('Number of phone calls (').fill('5');
        await this.globalHelper.clickOnButton('Save and continue');
    };

    addNoDisbursements = async () => {
        await this.expectations.heading('Do you need to claim a disbursement?');
        await this.page.getByLabel('No', { exact: true }).check();
        await this.globalHelper.clickOnButton('Save and continue');
    };

    fillUpOtherRelevantInformation = async () => {
        await this.expectations.heading('Other relevant information');
        await selectRadioButton(this.page, 'Do you want to add any other information?', 'No');
        await selectRadioButton(this.page, 'Did the proceedings conclude over 3 months ago?', 'No');
        await this.globalHelper.clickOnButton('Save and continue');
    };

    /**
     * Checks the answers page for expected texts
     * @param {string[]} expectedTexts - Array of texts to check on the page
     * @throws {Error} If any expected text is not found
     * @returns {Promise<void>}
     * @example
     * await checkYourAnswers(['Category 1a', 'Guilty plea', 'Additional fee', 'Youth court fee claimed', 'Test Automate']);
     */
    checkYourAnswers = async (expectedTexts) => {
        if (!Array.isArray(expectedTexts)) {
            throw new Error('Expected texts must be an array');
        }
        await this.expectations.heading('Check your answers');
        for (const text of expectedTexts) {
            await this.expectations.text(text);
        }
        await this.globalHelper.clickOnButton('Save and continue', 'link');
    };

    skipEqualityQuestions = async () => {
        await this.expectations.heading('Equality monitoring questions');
        await this.page.locator('#nsm-steps-answer-equality-form-answer-equality-no-field').check();
        await this.globalHelper.clickOnButton('Save and continue');
    };

    confirmAndSubmitNSMClaim = async () => {
        await this.expectations.heading('Confirm the following');
        await this.page.getByLabel('Full name').fill('Test Automate');
        await this.globalHelper.clickOnButton('Save and submit');
    };

};
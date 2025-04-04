// e2e/helpers/caseworkerTestStepsHelper.js
import { AllClaimsPage } from '../pages/caseworker/all-claims';
import { GlobalHelper } from '../../../helpers/globalHelper';
import { ExpectationHelper } from './expectationHelper';
import { nsmData, formatDate } from '../../../helpers';

const pageMap = { AllClaimsPage };
export class CaseworkerTestStepsHelper {
    constructor(page) {
        if (!page) throw new Error('Page is required');
        this.page = page;
        this.globalHelper = new GlobalHelper(page, pageMap);
        this.expectations = new ExpectationHelper(page);
    }

    viewClaim = async (laaReference) => {
        const allClaimsPage = new AllClaimsPage(this.page);
        await allClaimsPage.goto();
        await this.expectations.text(laaReference);
        await this.globalHelper.clickOnElement(laaReference, 'link');
        await this.expectations.heading(`${nsmData.defendant.firstName} ${nsmData.defendant.lastName}`);
    }

    getBaseTexts = () => [
        `Unique file number${nsmData.uniqueFile}`,
        `Type of claim${nsmData.claimType.nsm}`,
        `Defendant 1 (lead)${nsmData.defendant.firstName} ${nsmData.defendant.lastName}${nsmData.defendant.maatId}`,
        'Main offence nameCriminal Damage',
        `Offence date${formatDate(nsmData.mainOffenceDate)}`,
        'Assigned counselNo',
        'Unassigned counselNo',
        'Instructed agentNo',
        "Case remitted from Crown Court to magistrates' courtNo",
        'Category 1AGuilty plea',
        'Additional feeYouth court fee claimed',
        "Why are you claiming a non-standard magistrates' payment?Enhanced rates claimed",
        `Number of pages of prosecution evidence${nsmData.evidencePages.prosecution}`,
        `Number of pages of defence statements${nsmData.evidencePages.defence}`,
        `Number of witnesses${nsmData.witnesses}`,
        'Recorded evidenceNo',
        'Work done before order was grantedNo',
        'Work was done after last hearingNo',
        `Date of first hearing${formatDate(nsmData.hearingDate)}`,
        `Number of hearings${nsmData.hearingCount}`,
        "Magistrates' courtAberconwy PSD - C3237",
        'Youth courtYes',
        `Hearing outcomeCP19 - Deferred sentence`,
        `Matter type9 - Public order offences`,
        'Any other informationNo',
        'Proceedings concluded over 3 months agoNo',
        `Firm name${nsmData.firmName}`,
        `Firm office account number${nsmData.firmAccountNumber}`,
        `Firm address${nsmData.addressLine1}${nsmData.townOrCity}${nsmData.postcode}`,
        `Solicitor full name${nsmData.solicitorFirstName} ${nsmData.solicitorLastName}`,
        `Solicitor reference number${nsmData.solicitorReferenceNumber}`,
        `Contact full name${nsmData.contactFirstName} ${nsmData.contactLastName}`,
        `Contact email address${nsmData.contactEmailAddress}`,
        'Equality questionsNo, skip the equality questions'
    ];

    verifyClaimDetails = async (scenarioSpecificTexts) => {
        const texts = this.getBaseTexts().concat(scenarioSpecificTexts);
        for (const text of texts) {
            await this.expectations.text(text);
        }
    }

    /**
     * Verifies the claim amount
     * @param {string} netCost - Net cost claimed
     * @param {string} vat - VAT on claimed amount
     * @param {string} totalAmount - Total amount claimed
     * @returns {Promise<void>}
     * @example
     * await verifyClaimAmount('£1,207.52', '£241.50', '£1,449.02');
     */
    verifyClaimAmount = async (netCost, vat, totalAmount) => {
        const expectedText = `TotalSum of net cost claimed: ${netCost}Sum of VAT on claimed: ${vat}Sum of net cost and VAT on claimed: ${totalAmount}`;
        await this.globalHelper.clickOnElement('Review and adjust', 'link');
        await this.expectations.text(expectedText);
    }
}

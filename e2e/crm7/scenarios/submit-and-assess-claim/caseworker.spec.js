import { test, expect } from '../../../fixtures/global-setup';
import { AllClaimsPage } from '../../pages/caseworker/all-claims';
import {
    authenticateAsCaseworker,
    nsmData,
    formatDate
} from '../../../../helpers';

test.describe('CRM7 - As a Caseworker', () => {
    test('assessing new claim', async ({ caseworkerFixture }) => {
        const { page, laaReference } = caseworkerFixture;
        // Assessing the claim
        await authenticateAsCaseworker(page);
        await test.step('View claim in caseworker app', async () => {
            const allClaimsPage = new AllClaimsPage(page);
            await allClaimsPage.goto();
            await expect(page.locator('#main-content')).toContainText(laaReference);
            await page.getByRole('link', { name: laaReference }).click();
            await page.waitForURL('**/claim_details');
            await expect(page.getByRole('heading', { name: `${nsmData.defendant.firstName} ${nsmData.defendant.lastName}` })).toBeVisible();
        });

        await test.step('Self-assign claim', async () => {
            await page.getByRole('link', { name: 'Add to my list' }).click();
            await page.waitForURL('**/new');
            await page.getByLabel('Explain').fill('Assigning this to myself to I can interact with it');
            await page.getByRole('button', { name: 'Yes, add to my list' }).click();
            await page.waitForURL('**/claim_details');
        });

        await test.step('Verify claim details', async () => {
            const texts = [
                `Unique file number${nsmData.uniqueFile}`,
                `Type of claim${nsmData.claimType.nsm}`,
                `Representation order date${formatDate(nsmData.repOrderDate.default)}`,
                `Defendant 1 (lead)${nsmData.defendant.firstName} ${nsmData.defendant.lastName}${nsmData.defendant.maatId}`,
                'Main offence nameCriminal Damage',
                `Offence date${formatDate(nsmData.mainOffenceDate)}`,
                'Assigned counselNo',
                'Unassigned counselNo',
                'Instructed agentNo',
                "Case remitted from Crown Court to magistrates' courtNo",
                'Category 1Guilty plea',
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
                'Youth courtNo',
                `Hearing outcome${nsmData.hearingOutcome}`,
                `Matter type${nsmData.matterType}`,
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
            ]

            texts.forEach(async (text) => {
                await expect(page.locator('#main-content')).toContainText(text);
            });
        })

        await test.step('Verify claim is for correct amount', async () => {
            await page.getByRole('link', { name: 'Review and adjust' }).click();
            await page.waitForURL('**/work_items');
            await expect(page.locator('#main-content')).toContainText(
                'TotalSum of net cost claimed: £529.58Sum of VAT on claimed: £105.92Sum of net cost and VAT on claimed: £635.49'
            );
        });

        await test.step('Grant claim', async () => {
            await page.getByRole('link', { name: 'Make a decision' }).click();
            await page.waitForURL('**/make_decision');
            await page.getByLabel('Grant', { exact: true }).check();
            await page.getByRole('button', { name: 'Submit decision' }).click();
            await page.waitForURL('**/closed');
            await page.getByRole('cell', { name: laaReference }).getByRole('link').click();
            await page.waitForURL('**/claim_details');
            await expect(page.locator('#main-content')).toContainText('Granted');
        });
    });
});

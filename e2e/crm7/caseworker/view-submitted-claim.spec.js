import { test, expect } from '@playwright/test';
import { runTestAs, formData, caseworkerAppUrl, formatDate } from '../../../helpers';
import {
    AllClaimsPage
} from '../pages/caseworker/all-claims';

export default function createTests() {
    let page;
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });
    test.afterAll(async () => {
        await page.close();
    });
    // Authenticate as provider
    test.use({ storageState: runTestAs('caseworker') })

    test('View claim in caseworker app', async () => {
        const syncUrl = caseworkerAppUrl() + '/sync';
        await page.goto(syncUrl);

        const allClaimsPage = new AllClaimsPage(page);
        await allClaimsPage.goto();

        await page.locator('.govuk-table .govuk-link').click();
        await page.waitForURL('**/claim_details');
        await expect(page.getByRole('heading', { name: `${formData.defendant.firstName} ${formData.defendant.lastName}` })).toBeVisible();
    });

    test('Verify claim details', async () => {
        const texts = [
            `Unique file number${formData.uniqueFile}`,
            `Type of claim${formData.claimType}`,
            `Representation order date${formatDate(formData.repOrderDate)}`,
            `Main defendant full name${formData.defendant.firstName} ${formData.defendant.lastName}`,
            `Main defendant MAAT ID${formData.defendant.maatId}`,
            'Main offence nameCriminal Damage',
            `Offence date${formatDate(formData.mainOffenceDate)}`,
            'Assigned counselNo',
            'Unassigned counselNo',
            'Instructed agentNo',
            "Case remitted from Crown Court to magistrates' courtNo",
            'Category 1Guilty plea',
            "Why are you claiming a non-standard magistrates' payment?Enhanced rates claimed",
            `Number of pages of prosecution evidence${formData.evidencePages.prosecution}`,
            `Number of pages of defence statements${formData.evidencePages.defence}`,
            `Number of witnesses${formData.witnesses}`,
            'Supplemental claimNo',
            'Recorded evidenceNo',
            'Work done before order was grantedNo',
            'Work was done after last hearingNo',
            `Date of first hearing${formatDate(formData.hearingDate)}`,
            `Number of hearings${formData.hearingCount}`,
            "Magistrates' courtCity of London Magistrates' Court",
            'Court is in designated area of the firmNo',
            'Youth courtNo',
            `Hearing outcome${formData.hearingOutcome}`,
            `Matter type${formData.matterType}`,
            'Any other informationNo',
            'Proceedings concluded over 3 months agoNo',
            `Firm name${formData.firmName}`,
            `Firm account number${formData.firmAccountNumber}`,
            `Firm address${formData.addressLine1}${formData.townOrCity}${formData.postcode}`,
            `Solicitor full name${formData.solicitorFirstName} ${formData.solicitorLastName}`,
            `Solicitor reference number${formData.solicitorReferenceNumber}`,
            'Alternative contact detailsNot provided',
            'Provider email addresssingle@office.com',
            'Equality questionsNo, skip the equality questions'
        ]

        texts.forEach(async (text) => {
            await expect(page.locator('#main-content')).toContainText(text);
        });
    })

    test('Verify claim is for correct amount', async () => {
        page.getByRole('link', { name: 'Adjustments' }).click();
        await page.waitForURL('**/adjustments');
        await expect(page.locator('#main-content')).toContainText('£624.81');
    });
}

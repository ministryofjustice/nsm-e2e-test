import { test, expect } from '../../../fixtures/global-setup';
import {
    authenticateAsCaseworker,
    getLAAReferenceFromPage,
    getLAAReference,
    paymentData
} from '../../../../helpers';
import {
    ClaimTypePage,
    LinkedClaimPage,
    CounselCodePage,
    AcClaimCostsPage
} from '../../pages';

test.describe('Assigned Counsel linked to digital submission - As a Caseworker', () => {
    test('Creating a payment request linked to an existing CRM7 claim', async ({ paymentsFixture }) => {
        const { page } = paymentsFixture;
        const linkedClaimReference = await getLAAReference(page, 'submit-and-assess-claim-with-payment');

        await authenticateAsCaseworker(page);

        await test.step('Start payment request and link to existing CRM7 claim', async () => {
            await page.getByRole('link', { name: 'Request a payment' }).click();
            await page.getByRole('link', { name: 'Create payment request' }).click();

            const claimTypePage = new ClaimTypePage(page);
            await claimTypePage.selectClaimType('Assigned counsel');

            const linkedClaimPage = new LinkedClaimPage(page);
            await linkedClaimPage.selectLinkedClaim(linkedClaimReference);
            await expect(page.getByRole('cell', { name: linkedClaimReference })).toBeVisible();
            await page.getByRole('button', { name: 'Select' }).click();
        });

        await test.step('Complete and submit payment request', async () => {
            const counselCodePage = new CounselCodePage(page);
            await counselCodePage.selectCounselCode();

            await expect(page.getByLabel('Date claim assessed')).toBeVisible();
            await page.getByLabel('Date claim assessed').fill(paymentData.acClaimDetails.dateAssessed);
            await page.getByRole('button', { name: 'Continue' }).click();

            const claimCostsPage = new AcClaimCostsPage(page);
            await expect(page.getByRole('heading', { name: 'Claimed costs' })).toBeVisible();
            await claimCostsPage.fillCosts();
            await expect(page.getByRole('heading', { name: 'Allowed costs' })).toBeVisible();
            await claimCostsPage.fillCosts();

            await expect(page.getByRole('heading', { name: 'Check your answers' })).toBeVisible();
            await expect(page.getByText('Linked non-standard claim')).toBeVisible();
            await expect(page.getByText(linkedClaimReference)).toBeVisible();
            await page.getByRole('button', { name: 'Submit payment request' }).click();
            await expect(page.getByRole('heading', { name: 'Payment request complete' })).toBeVisible();
        });

        await test.step('Verify linked claim is shown in payment request details', async () => {
            const paymentReference = await getLAAReferenceFromPage(page, 'Reference:');
            await page.getByRole('link', { name: 'Payment requests' }).click();
            await page.getByRole('link', { name: paymentReference }).first().click();
            await page.getByRole('link', { name: 'Claim details' }).click();

            await expect(page.getByRole('heading', { name: paymentReference })).toBeVisible();
            await expect(page.getByText('Linked claim')).toBeVisible();
            await expect(page.getByText(linkedClaimReference)).toBeVisible();
        });
    });
});

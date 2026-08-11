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
    NsmClaimCostsPage
} from '../../pages';

test.describe('NSM supplemental linked to digital submission - As a Caseworker', () => {
    test('Creating a supplemental payment request linked to an existing CRM7 claim', async ({ paymentsFixture }) => {
        const { page } = paymentsFixture;
        const linkedClaimReference = await getLAAReference(page, 'submit-and-assess-claim-with-payment');

        await authenticateAsCaseworker(page);

        await test.step('Start supplemental payment request and link CRM7 claim', async () => {
            await page.getByRole('link', { name: 'Request a payment' }).click();
            await page.getByRole('link', { name: 'Create payment request' }).click();

            const claimTypePage = new ClaimTypePage(page);
            await claimTypePage.selectClaimType('Non-standard magistrates - supplemental');

            const linkedClaimPage = new LinkedClaimPage(page);
            await linkedClaimPage.selectLinkedClaim(linkedClaimReference);
            await expect(page.getByRole('cell', { name: linkedClaimReference })).toBeVisible();
            await page.getByRole('button', { name: 'Select' }).click();
        });

        await test.step('Complete supplemental claim details', async () => {
            await expect(page.getByLabel('Date supplemental claim assessed')).toBeVisible();
            await page.getByLabel('Date supplemental claim assessed').fill(paymentData.nsmClaimDetails.dateAssessed);
            await page.getByRole('button', { name: 'Continue' }).click();
        });

        await test.step('Complete costs and submit payment request', async () => {
            const claimCostsPage = new NsmClaimCostsPage(page);
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

        await test.step('Open payment request details and verify original claim linkage', async () => {
            const paymentReference = await getLAAReferenceFromPage(page, 'Reference:');
            await page.getByRole('link', { name: 'Payment requests' }).click();
            await page.getByRole('link', { name: paymentReference }).first().click();
            await page.getByRole('link', { name: 'Claim details' }).click();

            await expect(page.getByRole('heading', { name: paymentReference })).toBeVisible();
            await expect(page.getByRole('rowheader', { name: 'Original claim', exact: true })).toBeVisible();
            const originalClaimLink = page.getByRole('link', { name: `Link to: ${linkedClaimReference}` });
            await expect(originalClaimLink).toBeVisible();
            await originalClaimLink.click();
            await expect(page.getByRole('heading', { name: linkedClaimReference })).toBeVisible();
        });
    });
});

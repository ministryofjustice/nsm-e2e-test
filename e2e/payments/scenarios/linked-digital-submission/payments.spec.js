import { readFile } from 'fs/promises';
import { test, expect } from '../../../fixtures/global-setup';
import {
    authenticateAsCaseworker,
    getLAAReferenceFromPage,
    paymentData
} from '../../../../helpers';
import {
    ClaimTypePage,
    LinkedClaimPage,
    CounselCodePage,
    AcClaimCostsPage
} from '../../pages';

const crm7StoragePath = './e2e/storage/submit-and-assess-claim-with-payment-provider-state.json';

const getLinkedClaimReference = async () => {
    const storageStateRaw = await readFile(crm7StoragePath, 'utf8');
    const storageState = JSON.parse(storageStateRaw);
    const laaReference = storageState.origins
        ?.flatMap((origin) => origin.localStorage || [])
        ?.find((item) => item.name === 'laaReference')
        ?.value;
    if (!laaReference) {
        throw new Error(`LAA reference not found in ${crm7StoragePath}`);
    }

    return laaReference;
};

test.describe('Assigned Counsel linked to digital submission - As a Caseworker', () => {
    test('Creating a payment request linked to an existing CRM7 claim', async ({ paymentsFixture }) => {
        const { page } = paymentsFixture;
        const linkedClaimReference = await getLinkedClaimReference();

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

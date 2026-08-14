import { test, expect } from '../../../fixtures/global-setup';
import {
    authenticateAsCaseworker,
    getLAAReferenceFromPage,
    paymentData
} from '../../../../helpers';
import { 
    ClaimTypePage, 
    SolicitorCodePage,
    ClaimDetailsPage,
    NsmClaimCostsPage,
    LinkedClaimPage 
} from '../../pages';

test.describe('Non-Standard Magistrates amendment from scratch - As a Caseworker', () => {
    test('Creating a non-standard magistrates payment from scratch', async ({paymentsFixture}) => {
        const {page} = paymentsFixture;
        await authenticateAsCaseworker(page);
        const claimType = "Non-standard magistrates - amendment";
        
        await test.step('Select payment type', async () => {
            await page.getByRole('link', { name: 'Request a payment' }).click();
            await page.getByRole('link', { name: 'Create payment request' }).click();
            
            const claimTypePage = new ClaimTypePage(page);
            await claimTypePage.selectClaimType(claimType);    
        });

        await test.step('Do not link a claim', async () => {
            //Select linked claim
            const linkedClaimPage = new LinkedClaimPage(page);
            await linkedClaimPage.selectLinkedClaim();
        });

        await test.step('Select solicitor', async () => {
            const solicitorCodePage = new SolicitorCodePage(page);
            await solicitorCodePage.selectSolicitorCode();
        });

        await test.step('Fill in claim details', async () => {
            const claimDetailsPage = new ClaimDetailsPage(page);
            await claimDetailsPage.fillClaimDetails("Non-standard magistrates", false, true);
        });

        await test.step('Fill in costs', async () => {
            const allowedCostsPage = new NsmClaimCostsPage(page);
            await expect(page.getByRole('heading', { name: 'Allowed costs' })).toBeVisible();
            await allowedCostsPage.fillCosts();
        });

        await test.step('Submit and confirm payment', async () => {
            await expect(page.getByText(claimType)).toBeVisible();
            await page.getByRole('button', { name: 'Submit payment request' }).click();
            await expect(page.getByRole('heading', { name: 'Payment request complete' })).toBeVisible();

            const paymentReference = await getLAAReferenceFromPage(page, 'Reference:');
            await page.getByRole('link', { name: 'Payment requests' }).click();
            await page.getByRole('link', { name: paymentReference }).first().click();
            await expect(page.getByRole('heading', { name: paymentReference })).toBeVisible();
            await expect(page.getByText('Payment type: Non-standard magistrates - amendment')).toBeVisible();
        });

    });
});
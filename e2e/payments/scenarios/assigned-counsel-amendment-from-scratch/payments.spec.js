import { test, expect } from '../../../fixtures/global-setup';
import {
    authenticateAsCaseworker,
    getLAAReferenceFromPage,
    storeLAAReference
} from '../../../../helpers';
import { ClaimTypePage, LinkedClaimPage, SolicitorCodePage, CounselCodePage, ClaimDetailsPage, AcClaimCostsPage } from '../../pages';

test.describe('Assigned Counsel Amendment Payment from scratch - As a Caseworker', () => {
    test('Creating an assigned counsel amendment payment from scratch', async ({paymentsFixture}) => {
        const {page, scenarioName} = paymentsFixture;
        await authenticateAsCaseworker(page);
        const claimType = 'Assigned counsel - amendment';
        
        await test.step('Select payment type', async () => {
            //Select payment type
            await page.getByRole('link', { name: 'Request a payment' }).click();
            await expect(page.getByRole('heading', { name: 'Payment request' })).toBeVisible();
            await page.getByRole('link', { name: 'Create payment request' }).click();
            
            const claimTypePage = new ClaimTypePage(page);
            await claimTypePage.selectClaimType(claimType);    
        });

        await test.step('Start claim from scratch', async () => {
            //Create payment from scratch
            await expect(page.getByRole('heading', { name: 'Search for the assigned counsel claim' })).toBeVisible();
            const linkedClaimPage = new LinkedClaimPage(page);
            await linkedClaimPage.selectLinkedClaim();
        });

        await test.step('Select solicitor', async () => {
            const solicitorCodePage = new SolicitorCodePage(page);
            await solicitorCodePage.selectSolicitorCode();
        });

        await test.step('Select assigned counsel', async () => {
            const counselCodePage = new CounselCodePage(page);
            await counselCodePage.selectCounselCode();
        });
        
        await test.step('Fill in claim details', async () => {
            //Fill in claim details 
            await expect(page.getByRole('heading', { name: 'Claim details' })).toBeVisible();
            const claimDetailsPage = new ClaimDetailsPage(page);
            await claimDetailsPage.fillClaimDetails(claimType, false);
        });

        await test.step('Fill in claimed costs', async () => {
            //Fill in costs
            await expect(page.getByRole('heading', { name: 'Claimed costs' })).toBeVisible();
            const claimCostsPage = new AcClaimCostsPage(page);
            await claimCostsPage.fillCosts();
        });

        await test.step('Fill in costs to be paid', async () => {
            //Fill in costs to be paid
            await expect(page.getByRole('heading', { name: 'Costs to be paid' })).toBeVisible();
            const costsToBePaidPage = new AcClaimCostsPage(page);
            await costsToBePaidPage.fillCosts();
        });

        await test.step('Submit and confirm payment', async () => {
            //Check you answers page
            await expect(page.getByRole('heading', { name: 'Check your answers' })).toBeVisible();
            await page.getByRole('button', { name: 'Submit payment request' }).click();

            //Confirmation page
            await expect(page.getByRole('heading', { name: 'Payment request complete' })).toBeVisible();
        });

        //Store LAA reference for future use
        let laaReference;
        laaReference = await getLAAReferenceFromPage(page, 'Reference:');
        await storeLAAReference(page, laaReference, scenarioName);

        await test.step('View payment', async () => {
            await page.getByRole('link', {name: 'Payment requests'}).click();
            const paymentRowLink = page.getByRole('link', { name: laaReference });
            await expect(paymentRowLink).toBeVisible({ timeout: 3000 });
            await paymentRowLink.click();

            await expect(page.getByRole('heading', { name: laaReference })).toBeVisible({ timeout: 3000 });
            await expect(page.getByText('Payment type: Assigned counsel - amendment')).toBeVisible();
        });
    });
});
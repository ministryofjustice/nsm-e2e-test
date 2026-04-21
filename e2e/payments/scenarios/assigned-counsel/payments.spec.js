import { test, expect } from '../../../fixtures/global-setup';
import {
    authenticateAsCaseworker,
    storeLAAReference
} from '../../../../helpers';
import { ClaimTypePage, LinkedClaimPage, SolicitorCodePage, ClaimDetailsPage, AcClaimCostsPage } from '../../pages';

test.describe('Assigned Counsel Payment - As a Caseworker', () => {
    test('Creating an assigned counsel payment from scratch', async ({paymentsFixture}) => {
        const {page, scenarioName} = paymentsFixture;
        await authenticateAsCaseworker(page);
        const claimType = 'Assigned counsel';
        
        await test.step('Select payment type', async () => {
            //Select payment type
            await page.getByRole('link', { name: 'Payments' }).click();
            await expect(page.getByRole('heading', { name: 'Payment requests' })).toBeVisible();
            await page.getByRole('link', { name: 'Create payment request' }).click();
            
            const claimTypePage = new ClaimTypePage(page);
            await claimTypePage.selectClaimType(claimType);    
        });

        await test.step('Start claim from scratch', async () => {
            //Create payment from scratch
            await expect(page.getByRole('heading', { name: 'Search for the non-standard magistrates claim' })).toBeVisible();
            const linkedClaimPage = new LinkedClaimPage(page);
            await linkedClaimPage.selectLinkedClaim();
        });

        await test.step('Select solicitor', async () => {
            const solicitorCodePage = new SolicitorCodePage(page);
            await solicitorCodePage.selectSolicitorCode();
        });
        
        await test.step('Fill in claim details', async () => {
            //Fill in claim details 
            await expect(page.getByRole('heading', { name: 'Claim details' })).toBeVisible();
            const claimDetailsPage = new ClaimDetailsPage(page);
            await claimDetailsPage.fillClaimDetails(claimType, false);
        });

        await test.step('Fill in costs', async () => {
            //Fill in costs
            await expect(page.getByRole('heading', { name: 'Claimed costs' })).toBeVisible();
            const claimCostsPage = new AcClaimCostsPage(page);
            await claimCostsPage.fillCosts();
            await expect(page.getByRole('heading', { name: 'Allowed costs' })).toBeVisible();
            await claimCostsPage.fillCosts();
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
        const panelLocator = await page.locator('.govuk-panel__body');
        const panelText = await panelLocator.textContent();
        laaReference = panelText.split('Reference:')[1].trim();
        await storeLAAReference(page, laaReference, scenarioName);

        await test.step('View payment', async () => {
            //See payment in homepage (TODO: This should be the button on the bottom of the page but this is currently being fixed)
            await page.getByRole('link', {name: 'Payment requests'}).click();
            const paymentRowCell = page.getByRole('cell', { name: laaReference });
            await expect(paymentRowCell).toBeVisible({ timeout: 3000 });
            await paymentRowCell.click();

            await expect(page.getByRole('heading', { name: laaReference })).toBeVisible({ timeout: 3000 });
            await expect(page.getByText('Payment type: Assigned counsel')).toBeVisible();
        });
    });
});
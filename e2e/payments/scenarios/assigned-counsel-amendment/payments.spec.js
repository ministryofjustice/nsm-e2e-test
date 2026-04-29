import { test, expect } from '../../../fixtures/global-setup';
import {
    authenticateAsCaseworker,
    storeLAAReference, 
    paymentData
} from '../../../../helpers';
import { ClaimTypePage, LinkedClaimPage, SolicitorCodePage, ClaimDetailsPage, AcClaimCostsPage } from '../../pages';

test.describe('Assigned Counsel Payment with Amendment - As a Caseworker', () => {
    test('Creating an assigned counsel payment with an appeal attached', async ({paymentsFixture}) => {
        const {page, scenarioName} = paymentsFixture;
        await authenticateAsCaseworker(page);

        //Create initial Assigned Counsel payment which will be linked to the appeal
        await page.getByRole('link', { name: 'Payments' }).click();
        await page.getByRole('link', { name: 'Create payment request' }).click();
        
        const claimTypePage = new ClaimTypePage(page);
        await claimTypePage.selectClaimType('Assigned counsel');  
        
        const linkedClaimPage = new LinkedClaimPage(page);
        await linkedClaimPage.selectLinkedClaim();
        const solicitorCodePage = new SolicitorCodePage(page);
        await solicitorCodePage.selectSolicitorCode();
        
        const claimDetailsPage = new ClaimDetailsPage(page);
        await claimDetailsPage.fillClaimDetails('Assigned counsel', false);
            
        const claimCostsPage = new AcClaimCostsPage(page);
        await claimCostsPage.fillCosts();
        await claimCostsPage.fillCosts();
       
        await page.getByRole('button', { name: 'Submit payment request' }).click();

        //Store LAA reference for future use
        let laaReference;
        const panelLocator = await page.locator('.govuk-panel__body');
        const panelText = await panelLocator.textContent();
        laaReference = panelText.split('Reference:')[1].trim();
        await storeLAAReference(page, laaReference, scenarioName);

        await test.step('Start creating an Assigned Counsel - amendment', async () => {
            await page.getByRole('link', {name: 'Payment requests'}).click();
            await page.getByRole('link', { name: 'Create payment request' }).click();
            const claimTypePage = new ClaimTypePage(page);
            await claimTypePage.selectClaimType('Assigned counsel - amendment');
        });

        await test.step('Link to original Assigned Counsel payment', async () => {
            const linkedClaimPage = new LinkedClaimPage(page);
            await linkedClaimPage.selectLinkedClaim(laaReference);
            await page.getByRole('button', { name: 'Select' }).click();
        });

        await test.step('Set appeal details', async () => {
            await expect(page.getByLabel('Date claim amended')).toBeVisible();
            await page.getByLabel('Date claim amended').fill(paymentData.acClaimDetails.dateAssessed);
            await page.getByRole('button', { name: 'Continue' }).click();
           
            const appealCostsPage = new AcClaimCostsPage(page);
            await expect(page.getByRole('heading', { name: 'Allowed costs' })).toBeVisible();
            await appealCostsPage.fillCosts();
        });

        await test.step('Submit and view appeal', async () => {
            await expect(page.getByText("Not linked to a non-standard magistrates' claim")).toBeVisible();
            await expect(page.getByText(laaReference)).toBeVisible();
            await page.getByRole('button', { name: 'Submit payment request' }).click();
            await expect(page.getByRole('heading', { name: 'Payment request complete' })).toBeVisible();
            
            await page.getByRole('link', {name: 'Payment requests'}).click();
            await page.getByRole('link', { name: laaReference }).first().click();
            await expect(page.getByText('Payment type: Assigned counsel - amendment')).toBeVisible();
        });
    });
});
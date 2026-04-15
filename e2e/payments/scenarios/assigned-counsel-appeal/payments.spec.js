import { test, expect } from '../../../fixtures/global-setup';
import {
    authenticateAsCaseworker,
    storeLAAReference, 
    paymentData
} from '../../../../helpers';
import { ClaimTypePage, LinkedClaimPage, SolicitorCodePage, ClaimDetailsPage, AcClaimCostsPage } from '../../pages';

test.describe('Assigned Counsel Payment with Appeal - As a Caseworker', () => {
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

        await test.step('Start creating an Assigned Counsel - appeal', async () => {
            //See payment in homepage (TODO: This should be the button on the bottom of the page but this is currently being fixed)
            await page.getByRole('link', {name: 'Payment requests'}).click();
            await page.getByRole('link', { name: 'Create payment request' }).click();
            const claimTypePage = new ClaimTypePage(page);
            await claimTypePage.selectClaimType('Assigned counsel - appeal');
        });

        await test.step('Link to original Assigned Counsel payment', async () => {
            const linkedClaimPage = new LinkedClaimPage(page);
            await linkedClaimPage.selectLinkedClaim(laaReference);
            await page.getByRole('button', { name: 'Select' }).click();
        });

        await test.step('Set appeal details', async () => {
            expect(page.getByLabel('Date appeal assessed')).toBeVisible();
            await page.getByLabel('Date appeal assessed').fill(paymentData.acClaimDetails.dateAssessed);
            await page.getByRole('button', { name: 'Continue' }).click();
           
            const appealCostsPage = new AcClaimCostsPage(page);
            expect(page.getByRole('heading', { name: 'Allowed costs' })).toBeVisible();
            await appealCostsPage.fillCosts();
        });

        await test.step('Submit and view appeal', async () => {
            expect(page.getByText("Not linked to a non-standard magistrates' claim")).toBeVisible();
            expect(page.getByText(laaReference)).toBeVisible();
            await page.getByRole('button', { name: 'Submit payment request' }).click();
            expect(page.getByRole('heading', { name: 'Payment request complete' })).toBeVisible();
            
            //See payment in homepage (TODO: This should be the button on the bottom of the page but this is currently being fixed)
            await page.getByRole('link', {name: 'Payment requests'}).click();
            await page.getByRole('link', { name: laaReference }).first().click();
            expect(page.getByText('Payment type: Assigned counsel - appeal')).toBeVisible();
        });
    });
});
import { test, expect } from '../../../fixtures/global-setup';
import {
    authenticateAsCaseworker,
    storeLAAReference, 
    paymentData
} from '../../../../helpers';
import { 
    ClaimTypePage, 
    SolicitorCodePage,
    ClaimDetailsPage,
    NsmClaimCostsPage,
    LinkedClaimPage 
} from '../../pages';

test.describe('Non-Standard Magistrates original payment with supplemental payment - As a Caseworker', () => {
    test('Creating a non-standard magistrates payment from scratch', async ({paymentsFixture}) => {
        const {page, scenarioName} = paymentsFixture;
        await authenticateAsCaseworker(page);
        const claimType = "Non-Standard Magistrates'";
        
        await test.step('Select payment type', async () => {
            await page.getByRole('link', { name: 'Payments' }).click();
            await page.getByRole('link', { name: 'Create payment request' }).click();
            
            const claimTypePage = new ClaimTypePage(page);
            await claimTypePage.selectClaimType(claimType);    
        });

        await test.step('Select solicitor', async () => {
            const solicitorCodePage = new SolicitorCodePage(page);
            await solicitorCodePage.selectSolicitorCode();
        });

        await test.step('Fill in claim details', async () => {
            const claimDetailsPage = new ClaimDetailsPage(page);
            await claimDetailsPage.fillClaimDetails(claimType, false);
        });

        await test.step('Fill in costs', async () => {
            const claimCostsPage = new NsmClaimCostsPage(page);
            await claimCostsPage.fillCosts();
            await claimCostsPage.fillCosts();
        });

        await test.step('Submit and confirm payment', async () => {
            await page.getByRole('button', { name: 'Submit payment request' }).click();
        });

        //Store LAA reference for future use
        let laaReference;
        const panelLocator = await page.locator('.govuk-panel__body');
        const panelText = await panelLocator.textContent();
        laaReference = panelText.split('Reference:')[1].trim();
        await storeLAAReference(page, laaReference, scenarioName);

        await test.step('Create linked NSM supplemental payment', async () => {
            await page.getByRole('link', { name: 'Payment requests', exact: true }).click();
            await page.getByRole('link', { name: 'Create payment request' }).click();
            const claimTypePage = new ClaimTypePage(page);
            await claimTypePage.selectClaimType("Non-Standard Magistrates' - supplemental");

            //Select linked claim
            const linkedClaimPage = new LinkedClaimPage(page);
            await linkedClaimPage.selectLinkedClaim(laaReference);
            expect(page.getByRole('cell', { name: laaReference })).toBeVisible();
            await page.getByRole('button', { name: 'Select' }).click();

            //Create payment
            expect(page.getByLabel('Date supplemental claim assessed')).toBeVisible();
            await page.getByLabel('Date supplemental claim assessed').fill(paymentData.nsmClaimDetails.dateAssessed);
            await page.getByRole('button', { name: 'Continue' }).click();

            //Fill in costs
            const costsPage = new NsmClaimCostsPage(page);
            expect(page.getByRole('heading', { name: 'Claimed costs' })).toBeVisible();
            await costsPage.fillCosts();
            expect(page.getByRole('heading', { name: 'Allowed costs' })).toBeVisible();
            await costsPage.fillCosts();


            //Check NSM claim is linked 
            expect(page.getByRole('heading', { name: 'Check your answers' })).toBeVisible();
            expect(page.getByText(laaReference)).toBeVisible();

            //Submit payment
            await page.getByRole('button', { name: 'Submit payment request' }).click();

            //Confirmation page
            expect(page.getByRole('heading', { name: 'Payment request complete' })).toBeVisible();
        });
    });
});
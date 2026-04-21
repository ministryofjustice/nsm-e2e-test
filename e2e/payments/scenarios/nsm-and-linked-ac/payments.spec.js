import { test, expect } from '../../../fixtures/global-setup';
import {
    authenticateAsCaseworker,
    storeLAAReference
} from '../../../../helpers';
import { 
    ClaimTypePage, 
    SolicitorCodePage,
    ClaimDetailsPage,
    NsmClaimCostsPage,
    AcClaimCostsPage,
    LinkedClaimPage 
} from '../../pages';

test.describe('Non-Standard Magistrates payment with linked AC Payment - As a Caseworker', () => {
    test('Creating a non-standard magistrates payment from scratch', async ({paymentsFixture}) => {
        const {page, scenarioName} = paymentsFixture;
        await authenticateAsCaseworker(page);
        const claimType = "Non-Standard Magistrates'";
        
        await test.step('Select payment type', async () => {
            await page.getByRole('link', { name: 'Payments' }).click();
            await expect(page.getByRole('heading', { name: 'Payment requests' })).toBeVisible();
            await page.getByRole('link', { name: 'Create payment request' }).click();
            
            const claimTypePage = new ClaimTypePage(page);
            await claimTypePage.selectClaimType(claimType);    
        });

        await test.step('Select solicitor', async () => {
            const solicitorCodePage = new SolicitorCodePage(page);
            await solicitorCodePage.selectSolicitorCode();
        });

        await test.step('Fill in claim details', async () => {
            await expect(page.getByRole('heading', { name: 'Claim details' })).toBeVisible();
            const claimDetailsPage = new ClaimDetailsPage(page);
            await claimDetailsPage.fillClaimDetails(claimType, false);
        });

        await test.step('Fill in costs', async () => {
            await expect(page.getByRole('heading', { name: 'Claimed costs' })).toBeVisible();
            const claimCostsPage = new NsmClaimCostsPage(page);
            await claimCostsPage.fillCosts();
            await expect(page.getByRole('heading', { name: 'Allowed costs' })).toBeVisible();
            await claimCostsPage.fillCosts();
        });

        await test.step('Submit and confirm payment', async () => {
            await expect(page.getByRole('heading', { name: 'Check your answers' })).toBeVisible();
            await page.getByRole('button', { name: 'Submit payment request' }).click();

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
            await expect(paymentRowCell).toBeVisible();
            await paymentRowCell.click();

            await expect(page.getByRole('heading', { name: laaReference })).toBeVisible();
            await expect(page.getByText("Payment type: Non-Standard Magistrates'")).toBeVisible();
        });

        await test.step('Create linked Assigned Counsel payment', async () => {
            await page.getByRole('link', { name: 'Payment requests', exact: true }).click();
            await page.getByRole('link', { name: 'Create payment request' }).click();
            const claimTypePage = new ClaimTypePage(page);
            await claimTypePage.selectClaimType("Assigned counsel");

            //Select linked claim
            const linkedClaimPage = new LinkedClaimPage(page);
            await linkedClaimPage.selectLinkedClaim(laaReference);
            const paymentRowCell = page.getByRole('cell', { name: laaReference });
            await expect(paymentRowCell).toBeVisible();
            await page.getByRole('button', { name: 'Select' }).click();

            //Create payment
            await expect(page.getByRole('heading', { name: 'Claim details' })).toBeVisible();
            const claimDetailsPage = new ClaimDetailsPage(page);
            await claimDetailsPage.fillClaimDetails("Assigned counsel", true);

            //Fill in costs
            await expect(page.getByRole('heading', { name: 'Claimed costs' })).toBeVisible();
            const claimCostsPage = new AcClaimCostsPage(page);
            await claimCostsPage.fillCosts();
            await expect(page.getByRole('heading', { name: 'Allowed costs' })).toBeVisible();
            await claimCostsPage.fillCosts();

            //Check NSM claim is linked 
            await expect(page.getByRole('heading', { name: 'Check your answers' })).toBeVisible();
            await expect(page.getByText(laaReference)).toBeVisible();

            //Submit payment
            await page.getByRole('button', { name: 'Submit payment request' }).click();

            //Confirmation page
            await expect(page.getByRole('heading', { name: 'Payment request complete' })).toBeVisible();
        });
    });
});
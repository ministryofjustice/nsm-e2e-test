import { test, expect } from '../../../fixtures/global-setup';
import {
    authenticateAsCaseworker,
    getLAAReferenceFromPage,
    storeLAAReference,
    paymentData
} from '../../../../helpers';
import { 
    ClaimTypePage, 
    SolicitorCodePage,
    ClaimDetailsPage,
    NsmClaimCostsPage,
    AcClaimCostsPage,
    LinkedClaimPage, 
    CounselCodePage
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
        laaReference = await getLAAReferenceFromPage(page, 'Reference:');
        await storeLAAReference(page, laaReference, scenarioName);

        await test.step('View payment', async () => {
            await page.getByRole('link', {name: 'Payment requests'}).click();
            await expect(page.getByRole('link', { name: laaReference })).toBeVisible();
            await page.getByRole('link', { name: laaReference }).click();

            await expect(page.getByRole('heading', { name: laaReference })).toBeVisible({ timeout: 3000 });
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
            await expect(page.getByRole('cell', { name: laaReference })).toBeVisible();
            await page.getByRole('button', { name: 'Select' }).click();

            //Create payment
            const counselCodePage = new CounselCodePage(page);
            await counselCodePage.selectCounselCode();
            await expect(page.getByText('Date claim assessed')).toBeVisible();
            await page.getByLabel('Date claim assessed').fill(paymentData.nsmClaimDetails.dateAssessed);
            await page.getByRole('button', { name: 'Continue' }).click();

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
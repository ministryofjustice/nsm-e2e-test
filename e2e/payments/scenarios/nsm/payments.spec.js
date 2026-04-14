import { test, expect } from '../../../fixtures/global-setup';
import {
    authenticateAsCaseworker,
} from '../../../../helpers';
import { ClaimTypePage,  SolicitorCodePage, ClaimDetailsPage, NsmClaimCostsPage } from '../../pages';

test.describe('Non-Standard Magistrates payment - As a Caseworker', () => {
    test('Creating a non-standard magistrates payment from scratch', async ({paymentsFixture}) => {
        const {page} = paymentsFixture;
        await authenticateAsCaseworker(page);
        const claimType = "Non-Standard Magistrates'";
        
        //Select payment type
        await page.getByRole('link', { name: 'Payments' }).click();
        expect(page.getByRole('heading', { name: 'Payment requests' })).toBeVisible();
        await page.getByRole('link', { name: 'Create payment request' }).click();
        
        const claimTypePage = new ClaimTypePage(page);
        await claimTypePage.selectClaimType(claimType);    
        
        const solicitorCodePage = new SolicitorCodePage(page);
        await solicitorCodePage.selectSolicitorCode('1A123B');
    
        //Fill in claim details 
        expect(page.getByRole('heading', { name: 'Claim details' })).toBeVisible();
        const claimDetailsPage = new ClaimDetailsPage(page);
        await claimDetailsPage.fillClaimDetails(claimType, false);

        //Fill in costs
        expect(page.getByRole('heading', { name: 'Claimed costs' })).toBeVisible();
        const claimCostsPage = new NsmClaimCostsPage(page);
        await claimCostsPage.fillCosts();
        expect(page.getByRole('heading', { name: 'Allowed costs' })).toBeVisible();
        await claimCostsPage.fillCosts();

        //Check you answers page
        expect(page.getByRole('heading', { name: 'Check your answers' })).toBeVisible();
        await page.getByRole('button', { name: 'Submit payment request' }).click();

        //Confirmation page
        expect(page.getByRole('heading', { name: 'Payment request complete' })).toBeVisible();
    });
});
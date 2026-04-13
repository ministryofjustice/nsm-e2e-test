import { test, expect } from '../../../fixtures/global-setup';
import {
    authenticateAsCaseworker,
} from '../../../../helpers';
import { ClaimTypePage, LinkedClaimPage, SolicitorCodePage, ClaimDetailsPage } from '../../pages';

test.describe('Assigned Counsel Payment - As a Caseworker', () => {
    test('Creating an assigned counsel payment from scratch', async ({paymentsFixture}) => {
        const {page} = paymentsFixture;
        await authenticateAsCaseworker(page);
        const claimType = 'Assigned counsel';
        
        //Select payment type
        await page.getByRole('link', { name: 'Payments' }).click();
        expect(page.getByRole('heading', { name: 'Payment requests' })).toBeVisible();
        await page.getByRole('link', { name: 'Create payment request' }).click();
        
        const claimTypePage = new ClaimTypePage(page);
        await claimTypePage.selectClaimType(claimType);    
    
        //Create payment from scratch
        expect(page.getByRole('heading', { name: 'Search for the non-standard magistrates claim' })).toBeVisible();
        const linkedClaimPage = new LinkedClaimPage(page);
        await linkedClaimPage.selectLinkedClaim();
        
        const solicitorCodePage = new SolicitorCodePage(page);
        await solicitorCodePage.selectSolicitorCode('1A123B');
    
        //Fill in claim details 
        expect(page.getByRole('heading', { name: 'Claim details' })).toBeVisible();
        const claimDetailsPage = new ClaimDetailsPage(page);
        await claimDetailsPage.fillClaimDetails(claimType, false);
    });
});
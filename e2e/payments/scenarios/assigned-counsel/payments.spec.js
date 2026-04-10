import { test, expect } from '../../../fixtures/global-setup';
import {
    authenticateAsCaseworker,
    selectRadioButton,
    formatDate
} from '../../../../helpers';

test.describe('Assigned Counsel Payment - As a Caseworker', () => {
    test('Creating an assigned counsel payment from scratch', async ({paymentsFixture}) => {
        const {page} = paymentsFixture;
        await authenticateAsCaseworker(page);
        
        //Select payment type
        await page.getByRole('link', { name: 'Payments' }).click();
        expect(page.getByRole('heading', { name: 'Payment requests' })).toBeVisible();
        await page.getByRole('link', { name: 'Create payment request' }).click();
        expect(page.getByText('Claim type' )).toBeVisible();
        await selectRadioButton(page, 'Claim type', 'Assigned counsel');
        await page.getByRole('button', { name: 'Continue' }).click();
    
        //Create payment from scratch
        expect(page.getByRole('heading', { name: 'Search for the non-standard magistrates claim' })).toBeVisible();
        await page.getByRole('button', { name: 'Create a new record' }).click();
    });
});
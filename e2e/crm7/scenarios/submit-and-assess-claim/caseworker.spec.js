import { test, expect } from '../../../fixtures/global-setup';
import { AllClaimsPage } from '../../pages/caseworker/all-claims';
import {
    authenticateAsCaseworker,
    nsmData,
    formatDate
} from '../../../../helpers';

test.describe('CRM7 - As a Caseworker', () => {
    test('assessing new claim', async ({ caseworkerFixture }) => {
        const { page, laaReference } = caseworkerFixture;
        // Assessing the claim
        await authenticateAsCaseworker(page);
        await test.step('View claim in caseworker app', async () => {
            const allClaimsPage = new AllClaimsPage(page);
            await allClaimsPage.goto();
            await expect(page.locator('#main-content')).toContainText(laaReference);
            await page.getByRole('link', { name: laaReference }).click();
            await page.waitForURL('**/claim_details');
            await expect(page.getByRole('heading', { name: laaReference })).toBeVisible();
        });

        await test.step('Self-assign claim', async () => {
            await page.getByRole('link', { name: 'Add to my list' }).click();
            await page.waitForURL('**/new');
            await page.getByLabel('Explain').fill('Assigning this to myself to I can interact with it');
            await page.getByRole('button', { name: 'Yes, add to my list' }).click();
            await page.waitForURL('**/claim_details');
        });

        await test.step('Verify claim is for correct amount', async () => {
            await page.getByRole('link', { name: 'Review and adjust' }).click();
            await page.waitForURL('**/work_items');
            await expect(page.locator('#main-content')).toContainText(
                'TotalSum of net cost claimed: £529.58Sum of VAT on claimed: £105.92Sum of net cost and VAT on claimed: £635.50'
            );
        });

        await test.step('Grant claim', async () => {
            await page.getByRole('link', { name: 'Make a decision' }).click();
            await page.waitForURL('**/make_decision');
            await page.getByLabel('Grant', { exact: true }).check();
            await page.getByRole('button', { name: 'Submit decision' }).click();
            await page.waitForURL('**/closed');
            await page.getByRole('cell', { name: laaReference }).getByRole('link').click();
            await page.waitForURL('**/claim_details');
            await expect(page.locator('#main-content')).toContainText('Granted');
        });
    });
});

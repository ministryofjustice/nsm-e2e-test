import { test, expect } from '../../../fixtures/global-setup';
import { YourApplicationsPageCaseworker, SearchApplicationsPage, AssessApplicationPage, MakeDecisionPage } from '../../pages/caseworker';
import { authenticateAsCaseworker } from '../../../../helpers';

test.describe('CRM4 - As a Provider', () => {
    test('submitting a new CRM4 application', async ({ caseworkerFixture }) => {
        const { page, laaReference } = caseworkerFixture;
        // Assessing the claim
        await authenticateAsCaseworker(page);
        await test.step('Viewing applications', async () => {
            const yourApplicationsPage = new YourApplicationsPageCaseworker(page);
            // Actions
            await yourApplicationsPage.goto();
            // Expectations
            await expect(page.getByRole('heading', { name: 'Your applications' })).toBeVisible();
        });

        await test.step('Searching for submitted application', async () => {
            const searchApplicationsPage = new SearchApplicationsPage(page);
            await searchApplicationsPage.goto();
            await expect(page.getByRole('heading', { name: 'Search for an application' })).toBeVisible();
            await page.getByLabel('Enter any combination of client or firm name, UFN or LAA reference').fill(laaReference);
            await page.getByRole('button', { name: 'Search' }).click();
            await page.getByRole('link', { name: laaReference }).click();
        });

        await test.step('Assessing the application', async () => {
            new AssessApplicationPage(page);
            // Expectations
            await expect(page.getByRole('heading', { name: laaReference })).toBeVisible();
            const addToMyListLink = page.getByRole('link', { name: 'Add to my list' });
            if (await addToMyListLink.isVisible()) {
                await addToMyListLink.click();
                await page.getByLabel('Explain your decision').fill('Assigning this application to myself to assess it');
                await page.getByRole('button', { name: 'Yes, add to my list' }).click();
                await expect(page.getByRole('heading', { name: laaReference })).toBeVisible();
            }
            await page.getByRole('link', { name: 'Make a decision' }).click();
            await expect(page.getByRole('heading', { name: 'Make a decision' })).toBeVisible();
        });

        await test.step('Making a decision', async () => {
            const makeDecisionPage = new MakeDecisionPage(page);
            // Actions
            await makeDecisionPage.grantApplication();
            // Expectations
            await expect(page.getByRole('heading', { name: 'Decision sent' })).toBeVisible();
        });
    });
});

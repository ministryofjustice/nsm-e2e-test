import { test, expect } from '../../../fixtures/global-setup';
import { YourApplicationsPageCaseworker, AssessApplicationPage, MakeDecisionPage } from '../../pages/caseworker';
import { authenticateAsCaseworker } from '../../../../helpers';

test.describe('CRM4 - As a Provider', () => {
    test('submitting a new CRM4 application', async ({ caseworkerFixture }) => {
        const { page, laaReference } = caseworkerFixture;
        // Assessing the claim
        await authenticateAsCaseworker(page);
        await test.step('Assigning next application', async () => {
            const yourApplicationsPage = new YourApplicationsPageCaseworker(page);
            // Actions
            await yourApplicationsPage.goto();
            // Expectations
            await expect(page.getByRole('heading', { name: 'Your applications' })).toBeVisible();
            // Actions
            await page.getByRole('button', { name: 'Assess next application' }).click();
        });

        await test.step('Assessing the application', async () => {
            new AssessApplicationPage(page);
            // Expectations
            await expect(page.getByRole('heading', { name: laaReference })).toBeVisible();
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


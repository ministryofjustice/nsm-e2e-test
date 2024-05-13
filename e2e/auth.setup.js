import { test as setup, expect } from '@playwright/test';
import { authenticateAsCaseworker, authenticateAsProvider, authenticateAsSupervisor, providerAppUrl } from '../helpers/index';

const supervisorFile = 'playwright/.auth/supervisor.json';
const caseworkerFile = 'playwright/.auth/caseworker.json';
const providerFile = 'playwright/.auth/provider.json';

setup('authenticate as provider', async ({ page }) => {
    await authenticateAsProvider(page);

    // Wait until the page reaches a state where all cookies are set.
    await expect(page.getByText('provider@example.com')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Submit a crime form' })).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: providerFile });
});

setup('authenticate as supervisor', async ({ page }) => {
    await authenticateAsSupervisor(page);

    // Wait until the page reaches a state where all cookies are set.
    await expect(page.getByLabel('Menu', { exact: true }).getByText('Super Visor')).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: supervisorFile });
});

setup('authenticate as caseworker', async ({ page }) => {
    await authenticateAsCaseworker(page);

    // Wait until the page reaches a state where all cookies are set.
    await expect(page.getByLabel('Menu', { exact: true }).getByText('Case Worker')).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: caseworkerFile });
});

import { test as setup, expect } from '@playwright/test';
require('dotenv').config();

const caseworkerAppUrl = process.env.NSM_ASSESS_DEV_URL;
const supervisorFile = 'playwright/.auth/supervisor.json';

setup('authenticate as supervisor', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto(caseworkerAppUrl);
    await expect(page.getByRole('button', { name: 'Start now' })).toBeVisible();
    await page.getByRole('button', { name: 'Start now' }).click();
    await page.getByLabel('Pick an account:').selectOption('super.visor@test.com');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Wait until the page reaches a state where all cookies are set.
    await expect(page.getByLabel('Menu', { exact: true }).getByText('Super Visor')).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: supervisorFile });
});

const caseworkerFile = 'playwright/.auth/caseworker.json';

setup('authenticate as caseworker', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto(caseworkerAppUrl);
    await expect(page.getByRole('button', { name: 'Start now' })).toBeVisible();
    await page.getByRole('button', { name: 'Start now' }).click();
    await page.getByLabel('Pick an account:').selectOption('case.worker@test.com');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Wait until the page reaches a state where all cookies are set.
    await expect(page.getByText('Case Worker')).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: caseworkerFile });
});
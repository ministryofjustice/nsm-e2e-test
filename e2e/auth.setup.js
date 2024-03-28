import { test as setup, expect } from '@playwright/test';
import { caseworkerAppUrl, providerAppUrl } from '../helpers/index';

const supervisorFile = 'playwright/.auth/supervisor.json';
const caseworkerFile = 'playwright/.auth/caseworker.json';
const providerFile = 'playwright/.auth/provider.json';

setup('authenticate as provider', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto(providerAppUrl());
    await page.getByRole('button', { name: 'Log in as provider with single office code' }).click();
    // Wait until the page reaches a state where all cookies are set.
    await expect(page.getByText('single@office.com')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Submit a crime form' })).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: providerFile });
});

setup('authenticate as supervisor', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto(caseworkerAppUrl());
    await page.getByLabel('Pick an account:').selectOption('super.visor@test.com');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Wait until the page reaches a state where all cookies are set.
    await expect(page.getByLabel('Menu', { exact: true }).getByText('Super Visor')).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: supervisorFile });
});

setup('authenticate as caseworker', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto(caseworkerAppUrl());
    await page.getByLabel('Pick an account:').selectOption('case.worker@test.com');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Wait until the page reaches a state where all cookies are set.
    await expect(page.getByLabel('Menu', { exact: true }).getByText('Case Worker')).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: caseworkerFile });
});
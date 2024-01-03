import { test, expect } from '@playwright/test';
import { getSupervisorFile } from '../../../helpers/index.js';

test.describe.configure({ mode: 'serial' });
test.describe('As a caseworker I want to see the correct risk level', () => {
    test.use({ storageState: getSupervisorFile() })
    test(' the risk level', async ({ page }) => {
        await page.goto('https://nsmassessdev.apps.live.cloud-platform.service.justice.gov.uk/claims');
        await page.getByRole('link', { name: 'All claims' }).click();
        await page.getByRole('link', { name: 'LAA-xUbkBI' }).click();
        await page.getByRole('link', { name: 'Change risk' }).click();
        await expect(page.getByText('Current risk: high risk')).toBeVisible();
        await expect(page.locator('#main-content')).toContainText('Current risk: high risk');
    });
});
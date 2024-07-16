import { test, expect } from '@playwright/test';
import { ViewAnalyticsPage } from '../pages';

import { authenticateAsCaseworker } from '../../../helpers';

test.describe('Analytics - Scenario 2', () => {
	let page;
	test.describe.configure({ mode: 'serial' });
	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
	});
	test.afterAll(async () => {
		await page.close();
	});

	test(' Caseworker - Caseworker tries to view analytics page', async () => {
		await authenticateAsSupervisor(page);
		await test.step('Trying to go to analytics page', async () => {
			const viewAnalyticsPage = new ViewAnalyticsPage(page);
			// Actions
			await viewAnalyticsPage.goto();
			// Expectations
			await expect(page.getByRole('button', { name: 'Make a new application' })).toBeVisible();
			await page.getByRole('button', { name: 'Make a new application' }).click();
		});

		await test.step('Viewing home page', async () => {
			const viewAnalyticsPage = new ViewAnalyticsPage(page);
			// Actions
			await viewAnalyticsPage.goto();
			// Expectations
		});
	});
});
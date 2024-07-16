import { test, expect } from '@playwright/test';
import { ViewAnalyticsPage } from '../pages';

import { authenticateAsSupervisor } from '../../../helpers';

test.describe('Analytics - Scenario 1', () => {
	let page;
	test.describe.configure({ mode: 'serial' });
	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
	});
	test.afterAll(async () => {
		await page.close();
	});

	test(' Caseworker - Supervisor views analytics page', async () => {
		await authenticateAsSupervisor(page);
		await test.step('Viewing analytics page', async () => {
			const viewAnalyticsPage = new ViewAnalyticsPage(page);
			// Actions
			await viewAnalyticsPage.goto();
			// Expectations
			await expect(page.getByRole('button', { name: 'Make a new application' })).toBeVisible();
			await page.getByRole('button', { name: 'Make a new application' }).click();
		});

		await test.step('Navigating to Non-standard magistrates analytics', async () => {
			const viewAnalyticsPage = new ViewAnalyticsPage(page);
			// Actions
			await viewAnalyticsPage.goto();
			// Expectations
		});

		await test.step('Navigating to search', async () => {
			const viewAnalyticsPage = new ViewAnalyticsPage(page);
			// Actions
			await viewAnalyticsPage.goto();
			
			// Expectations
		});
	});
});
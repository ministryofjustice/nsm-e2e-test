import { test, expect } from '@playwright/test';
import { YourApplicationsPage, IsThisPrisonLawPage, ApplyingTotalAmountPage } from '../pages/provider';

import { authenticateAsProvider } from '../../../helpers';

test.describe('CRM4 - Scenario 2', () => {
	let page;
	test.describe.configure({ mode: 'serial' });
	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
	});
	test.afterAll(async () => {
		await page.close();
	});

	test('Provider - Start a new application that is a Prison Law Matter and less than £500', async () => {
		await authenticateAsProvider(page);
		await test.step('Starting a new application', async () => {
			const yourApplicationsPage = new YourApplicationsPage(page);
			// Actions
			await yourApplicationsPage.goto();
			// Expectations
			await expect(page.getByRole('button', { name: 'Make a new application' })).toBeVisible();
			await page.getByRole('button', { name: 'Make a new application' }).click();
		});

		await test.step('Selecting the type of application', async () => {
			const isThisPrisonLawPage = new IsThisPrisonLawPage(page);
			// Actions
			await isThisPrisonLawPage.fillPrisonLawForm('Yes');

			//Expectations
			await expect(page.getByRole('heading', { name: 'Are you applying for a total' })).toBeVisible();
		});

		await test.step('Applying for total of less than £500', async () => {
			const applyingTotalAmountPage = new ApplyingTotalAmountPage(page);
			// Actions
			await applyingTotalAmountPage.fillApplyingTotalAmountForm('Yes');
			// Expectations
			await expect(page.getByRole('heading', { name: 'You do not need to apply' })).toBeVisible();
			await page.getByRole('link', { name: 'Finish' }).click();
		});
	})
});
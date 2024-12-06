import { test, expect } from '../../../fixtures/global-setup';
import { YourApplicationsPage, IsThisPrisonLawPage, ApplyingTotalAmountPage } from '../../pages/provider';

import { authenticateAsProvider } from '../../../../helpers';

test.describe('CRM4 - As a Provider', () => {
	test('starting a new application that is a Prison Law Matter and less than £500', async ({ providerFixture }) => {
		const { page } = providerFixture;
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
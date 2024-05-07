import { test, expect } from '@playwright/test';
import { getFromStorage } from '../../../helpers';
import { YourApplicationsPage, AssessApplicationPage, MakeDecisionPage } from '../pages/caseworker';

import { authenticateAsCaseworker } from '../../../helpers';

export default function createTests() {
	let page;
	test.describe.configure({ mode: 'serial' });
	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
	});
	test.afterAll(async () => {
		await page.close();
	});

	test('Making decision on a submitted CRM4 application', async () => {
		await authenticateAsCaseworker(page);
		await test.step('Assigning next application', async () => {
			const yourApplicationsPage = new YourApplicationsPage(page);
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
			const LAAReference = await getFromStorage('laaReference');
			await expect(page.getByRole('heading', { name: LAAReference })).toBeVisible();
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

}
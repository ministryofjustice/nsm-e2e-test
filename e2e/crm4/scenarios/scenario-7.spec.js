import { test, expect } from '@playwright/test';
import {
	YourApplicationsPage,
	IsThisPrisonLawPage,
	ApplyingTotalAmountPage,
	UniqueFileNumberPage,
	CaseContactPage,
	ClientDetailsPage,
	CaseAndHearingDetailsPage,
	PrimaryQuotePage,
	ServiceCostPage,
	AlternativeQuotesPage,
	ReasonWhyPage,
	CheckAnswersPage
} from '../pages/provider';
import { YourApplicationsPageCaseworker, AssessApplicationPage, MakeDecisionPage } from '../pages/caseworker';

import { authenticateAsProvider, authenticateAsCaseworker } from '../../../helpers';

test.describe('CRM4 - Scenario 7', () => {
	let page;
	let laaReference;
	test.describe.configure({ mode: 'serial' });
	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
	});
	test.afterAll(async () => {
		await page.close();
	});

	test('Provider - Submit a new CRM4 application ', async () => {
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
			await applyingTotalAmountPage.fillApplyingTotalAmountForm('No');
			// Expectations
			await expect(page.getByText('What is your unique file')).toBeVisible();
		});

		await test.step('Fill in the unique file number', async () => {
			const uniqueFileNumberPage = new UniqueFileNumberPage(page);
			// Actions
			await uniqueFileNumberPage.fillUniqueFileNumberForm();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Your application progress' })).toBeVisible();
			//Actions
			await page.getByRole('link', { name: 'Case contact' }).click();
		});

		await test.step('Fill in the case contact details', async () => {
			const caseContactPage = new CaseContactPage(page);
			// Actions
			await caseContactPage.fillCaseContactForm();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Your application progress' })).toBeVisible();
			//Actions
			await page.getByRole('link', { name: 'Client details' }).click();
		});

		await test.step('Fill in the client details', async () => {
			const clientDetailsPage = new ClientDetailsPage(page);
			// Actions
			await clientDetailsPage.fillClientDetailsForm();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Your application progress' })).toBeVisible();
			// Set LAA reference for future use
			const asideLocator = await page.locator('.aside-task-list');
			const asideText = await asideLocator.textContent();
			laaReference = asideText.split('LAA reference')[1].trim().split('\n')[0];
			// Actions
			await page.getByRole('link', { name: 'Case and hearing details' }).click();
		});

		await test.step('Fill in the case and hearing details', async () => {
			const caseAndHearingDetailsPage = new CaseAndHearingDetailsPage(page);
			// Actions
			await caseAndHearingDetailsPage.fillCaseAndHearingDetailsForm('No');
			// Expectations
			await expect(page.getByRole('heading', { name: 'Your application progress' })).toBeVisible();
			// Actions
			await page.getByRole('link', { name: 'Primary quote' }).click();
		});

		await test.step('Fill in the primary quote', async () => {
			const primaryQuotePage = new PrimaryQuotePage(page);
			// Actions
			await primaryQuotePage.fillPrimaryQuoteForm();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Service cost' })).toBeVisible();
		});

		await test.step('Fill in the service cost', async () => {
			const serviceCostPage = new ServiceCostPage(page);
			// Actions
			await serviceCostPage.fillServiceCostForm();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Primary quote summary' })).toBeVisible();
			// Actions
			await page.getByRole('link', { name: 'Save and continue' }).click();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Your application progress' })).toBeVisible();
			// Actions
			await page.getByRole('link', { name: 'Alternative quotes' }).click();
		});

		await test.step('Fill in the alternative quotes', async () => {
			const alternativeQuotesPage = new AlternativeQuotesPage(page);
			// Actions
			await alternativeQuotesPage.fillAlternativeQuotesForm();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Your application progress' })).toBeVisible();
			// Actions
			await page.getByRole('link', { name: 'Reason for prior authority' }).click();
		});

		await test.step('Fill in the reason for prior authority', async () => {
			const reasonWhyPage = new ReasonWhyPage(page);
			// Actions
			await reasonWhyPage.fillReasonWhyForm();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Your application progress' })).toBeVisible();
			// Actions
			await page.getByRole('link', { name: 'Submit application' }).click();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Check your answers' })).toBeVisible();
		});

		await test.step('Check your answers and submit', async () => {
			const checkAnswersPage = new CheckAnswersPage(page);
			// Actions
			await checkAnswersPage.fillCheckAnswersForm();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Application complete' })).toBeVisible();
			// Actions
			await page.getByRole('button', { name: 'View my applications' }).click();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Your applications' })).toBeVisible();
			await page.getByRole('tab', { name: 'Submitted' }).click();
			await expect(page.getByRole('cell', { name: laaReference })).toBeVisible();
		});

		// Caseworker - Making decision on a submitted CRM4 application
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
import { test, expect } from '../../../fixtures/global-setup';
import {
	YourApplicationsPage,
	IsThisPrisonLawPage,
	ApplyingTotalAmountPage,
	UniqueFileNumberPage,
	FirmAccountNumberPage,
	CaseContactPage,
	ClientDetailsPage,
	CaseAndHearingDetailsPage,
	PrimaryQuotePage,
	ServiceCostPage,
	AlternativeQuotesPage,
	ReasonWhyPage,
	CheckAnswersPage
} from '../../pages/provider';

import { authenticateAsProvider, storeLAAReference } from '../../../../helpers';

test.describe('CRM4 - As a Provider', () => {

	test('submitting a new CRM4 application', async ({ providerFixture }) => {
		const { page, scenarioName } = providerFixture;
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
			// Actions
			await page.getByRole('link', { name: 'Case contact' }).click();
		});

		await test.step('Fill in the case contact details', async () => {
			const caseContactPage = new CaseContactPage(page);
			// Actions
			await caseContactPage.fillCaseContactForm();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Which firm office account number is this application for?' })).toBeVisible();
		});

		await test.step('Select firm office account number', async () => {
			const firmAccountNumberPage = new FirmAccountNumberPage(page);
			// Actions
			await firmAccountNumberPage.fillFirmAccountNumberForm();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Your application progress' })).toBeVisible();
			// Actions
			await page.getByRole('link', { name: 'Client details' }).click();
		});

		await test.step('Fill in the client details', async () => {
			const clientDetailsPage = new ClientDetailsPage(page);
			// Actions
			await clientDetailsPage.fillClientDetailsForm();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Your application progress' })).toBeVisible();
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

      // Set LAA reference for future use
      let laaReference;
      const panelLocator = await page.locator('.govuk-panel__body');
			const panelText = await panelLocator.textContent();
			laaReference = panelText.split('Your LAA reference number')[1].trim();
			// Store LAA reference using scenario name from fixture
			await storeLAAReference(page, laaReference, scenarioName);

      // Actions
			await page.getByRole('button', { name: 'View your applications' }).click();
			// Expectations
			await expect(page.getByRole('heading', { name: 'Your applications' })).toBeVisible();
			await page.getByRole('tab', { name: 'Submitted' }).click();
      await expect(page.getByRole('cell', { name: laaReference })).toBeVisible();
		});
	});

});

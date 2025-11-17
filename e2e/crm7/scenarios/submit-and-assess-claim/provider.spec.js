import { test, expect } from '../../../fixtures/global-setup';
import {
    YourClaimsPage,
    WhatAreYouClaimingPage,
    YouClaimProgressPage,
    YourDetailsPage,
    ContactDetailsPage,
    FirmAccountNumberPage,
    DefendantDetailsPage,
    CasesDetailsPage,
    HearingDetailsPage,
    CaseDisposalPage,
    ClaimReasonPage,
    ClaimDetailsPage,
    WorkItemPage
} from '../../pages/provider';
import {
    nsmData,
    authenticateAsProvider,
    storeLAAReference
} from '../../../../helpers';

test.describe('CRM7 - As a Provider', () => {
    test('submitting a new claim', async ({ providerFixture }) => {
        const { page, scenarioName } = providerFixture;
        await authenticateAsProvider(page);
        await test.step('Starting a new claim', async () => {
            const yourClaimsPage = new YourClaimsPage(page);
            // Actions
            await yourClaimsPage.goto();
            // Expectations
            await expect(page.getByRole('button', { name: 'Start a new claim' })).toBeVisible();
            await page.getByRole('button', { name: 'Start a new claim' }).click();
        });

        await test.step('Filling up why claiming', async () => {
            const whatAreYouClaimingPage = new WhatAreYouClaimingPage(page);
            // What you are claiming for
            await expect(page.getByRole('heading', { name: 'What do you want to claim?' })).toBeVisible();
            await whatAreYouClaimingPage.fillClaimForm();

            await expect(page.getByRole('heading', { name: 'Which firm office account number is this claim for?' })).toBeVisible();
        });

        await test.step('Select firm office account number', async () => {
            const firmAccountNumberPage = new FirmAccountNumberPage(page);
            // Actions
            await firmAccountNumberPage.fillFirmAccountNumberForm();
            // Expectations
            await expect(page.getByRole('heading', { name: 'Was this case worked on in an office in an undesignated area?' })).toBeVisible();
        });

        await test.step('Complete office area question', async () => {
            await page.getByText(nsmData.officeInUndesignatedArea, { exact: true }).click();
            await page.getByRole('button', { name: 'Save and continue' }).click();

            // Your claim progress
            await expect(page.getByRole('heading', { name: 'Your claim progress' })).toBeVisible();
        });

        await test.step('Go to details and select Your details', async () => {
            const yourClaimProgressPage = new YouClaimProgressPage(page);
            await yourClaimProgressPage.clickOnYourDetails();
            // Your details
            await expect(page.getByRole('heading', { name: 'Firm details' })).toBeVisible();
        });

        await test.step('Filling up Your details', async () => {
            const yourDetails = new YourDetailsPage(page);
            // Actions
            await yourDetails.fillYourDetails();
            // Expectation
            await expect(page.getByRole('heading', { name: 'Contact details' })).toBeVisible();
        });

        await test.step('Complete contact details', async () => {
            const contactDetails = new ContactDetailsPage(page);
            // Actions
            await contactDetails.fillContactDetails();
            // Expectation
            await expect(page.getByRole('heading', { name: 'Defendant 1 (lead defendant)' })).toBeVisible();
        });

        await test.step('Filling up Defendant details', async () => {
            const defendantDetails = new DefendantDetailsPage(page);
            // Actions
            await defendantDetails.addDefendant();
            //Expectations
            await expect(page.getByRole('heading', { name: 'Defendants' })).toBeVisible();
            await expect(page.getByRole('cell', { name: 'Lex Luthor' })).toBeVisible();
            // Defendant lists
            await page.getByRole('group', { name: 'Do you want to add another defendant?' }).getByLabel('No').check();
            await page.getByRole('button', { name: 'Save and continue' }).click();
            await expect(page.getByRole('heading', { name: 'Case details' })).toBeVisible();
        });

        await test.step('Filling up Case details', async () => {
            // Case details
            const caseDetails = new CasesDetailsPage(page);
            await caseDetails.fillCaseDetails();
            // Hearing details
            await expect(page.getByRole('heading', { name: 'Hearing details' })).toBeVisible();
        })

        await test.step('Filling up Hearing details', async () => {
            // Hearing details
            const hearingDetails = new HearingDetailsPage(page);
            await hearingDetails.fillHearingDetailsWithYouthCourt(false);
            // Case Disposal
            await expect(page.getByRole('heading', { name: 'Select the case disposal' })).toBeVisible();
        });

        await test.step('Filling up Case Disposal', async () => {
            // Case Disposal
            const caseDisposal = new CaseDisposalPage(page);
            await caseDisposal.selectCaseDisposal();
            await expect(page.getByRole('heading', { name: "Why are you claiming a non-standard magistrates' court payment?" })).toBeVisible();
        });

        await test.step('Filling up Claim Reason', async () => {
            // Why are you claiming
            const claimReason = new ClaimReasonPage(page);
            await claimReason.selectClaimReason('Enhanced rates claimed');
            await expect(page.getByRole('heading', { name: 'Claim details' })).toBeVisible();
        });

        await test.step('Filling up Claim Details', async () => {
            // Claim details
            const claimDetails = new ClaimDetailsPage(page);
            await claimDetails.fillClaimDetails();
            await expect(page.getByRole('heading', { name: 'What work item are you' })).toBeVisible();
        });

        await test.step('Filling up Work items', async () => {
            // Work items
            const workItem = new WorkItemPage(page);
            await workItem.fillWorkItem();
            // Work items list
            await expect(page.getByRole('heading', { name: "Work items" })).toBeVisible();
            await expect(page.getByText('28 May 2015')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'Preparation' })).toBeVisible();
            await page.getByRole('group', { name: 'Do you want to add another work item?' }).getByLabel('No').check();
            await page.getByRole('button', { name: 'Save and continue' }).click();
            await expect(page.getByRole('heading', { name: 'Letters and phone calls' })).toBeVisible();
        });

        await test.step('Submit claim', async () => {
            // Letters and phone calls

            await page.getByLabel('Number of letters (optional)').fill('10');
            await page.getByLabel('Number of phone calls (').fill('5');
            await page.getByRole('button', { name: 'Save and continue' }).click();

            // Disbursements
            await expect(page.getByRole('heading', { name: 'Do you need to claim a disbursement?' })).toBeVisible();
            await page.getByLabel('No', { exact: true }).check();
            await page.getByRole('button', { name: 'Save and continue' }).click();

            // Check your claim
            await expect(page.getByRole('heading', { name: 'Check your payment claim' })).toBeVisible();
            await expect(page.getByRole('heading', { name: '£635.50' })).toBeVisible({ timeout: 10000 });
            await page.getByRole('link', { name: 'Save and continue' }).click();

            // Other relevant information
            await expect(page.getByRole('heading', { name: 'Other relevant information' })).toBeVisible();
            await page.getByRole('group', { name: 'Do you want to add any other information?' }).getByLabel('No').check();
            await page.getByRole('group', { name: 'Did the proceedings conclude over 3 months ago?' }).getByLabel('No', { exact: true }).check();
            await page.getByRole('button', { name: 'Save and continue' }).click();

            // Upload supporting evidence
            // Set input field to a file fixture directly to prevent validation errors.
            // This is simpler than attempting to emulate choosing of files.
            await expect(page.getByRole('heading', { name: 'Upload supporting evidence' })).toBeVisible();
            await page.locator('input#nsm-steps-supporting-evidence-form-supporting-evidence-field').setInputFiles('./e2e/fixtures/files/test.png');
            await page.getByRole('button', { name: 'Save and continue' }).click();

            // Check your answers
            await expect(page.getByRole('heading', { name: 'Check your answers' })).toBeVisible();
            await expect(page.getByText('Test Automate')).toBeVisible();
            await page.getByRole('link', { name: 'Save and continue' }).click();

            // Equality monitoring questions
            await expect(page.getByRole('heading', { name: 'Equality monitoring questions' })).toBeVisible();
            await page.locator('#nsm-steps-answer-equality-form-answer-equality-no-field').check();
            await page.getByRole('button', { name: 'Save and continue' }).click();

            // Confirm before submitting
            await expect(page.getByRole('heading', { name: 'Confirm the following' })).toBeVisible();
            await page.getByLabel('Full name').fill('Test Automate');
            await page.getByRole('button', { name: 'Save and submit' }).click();

            // Set LAA reference for future use
            let laaReference;
            const panelLocator = await page.locator('.govuk-panel__body');
            const panelText = await panelLocator.textContent();
            laaReference = panelText.split('Your LAA reference number')[1].trim();
            // Store LAA reference using scenario name from fixture
            await storeLAAReference(page, laaReference, scenarioName);
        });
    });

});

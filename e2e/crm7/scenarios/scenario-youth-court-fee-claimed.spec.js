import { test, expect } from '@playwright/test';
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
    CaseCategoryPage,
    CaseOutcomePage,
    EligibleYouthCourtFeePage,
    ClaimReasonPage,
    ClaimDetailsPage,
    WorkItemPage
} from '../pages/provider';

import {
    authenticateAsCaseworker,
    nsmData,
    formatDate,
    authenticateAsProvider,
} from '../../../helpers';

test.describe('NSM Claim for Youth court fee', () => {
    let page;
    let laaReference;
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });
    test.afterAll(async () => {
        await page.close();
    });

    test(' Start a new claim for Youth court Fee', async () => {
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
            await expect(page.getByRole('heading', { name: 'What you are claiming for' })).toBeVisible();
            await whatAreYouClaimingPage.fillClaimFormPostDecWithoutBOI();

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

            const asideLocator = await page.locator('.aside-task-list');
            const asideText = await asideLocator.textContent();
            laaReference = asideText.split('LAA reference')[1].split('Claim type')[0].trim();
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
            await expect(page.getByRole('heading', { name: "You've added 1 defendant" })).toBeVisible();
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
            await hearingDetails.fillHearingDetails('SelectYouthCourt');
            // Case Category
            await expect(page.getByRole('heading', { name: 'Select the case category' })).toBeVisible();
        });

        await test.step('Checking all the possible categories are visible', async () => {
            await expect(page.locator('div').filter({ hasText: /^Category 1A$/ })).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^Category 1B$/ })).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^Category 2A$/ })).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^Category 2B$/ })).toBeVisible();
        });

        await test.step('Filling up Case category', async () => {
            // Case Category
            const caseCategory = new CaseCategoryPage(page);
            await caseCategory.selectCaseCategory('Category 1A');
            await expect(page.getByRole('heading', { name: "Select the case outcome" })).toBeVisible();
        });

        await test.step('Filling up Case outcome', async () => {
            // Case Outcome
            const caseOutcome = new CaseOutcomePage(page);
            await caseOutcome.selectCaseOutcome();
            await expect(page.getByRole('heading', { name: 'Do you want to claim the' })).toBeVisible();
        });

        await test.step('Filling up Eligible Youth Court Fee', async () => {
            // Eligible Youth Court Fee
            const eligibleYouthCourtFee = new EligibleYouthCourtFeePage(page);
            await expect(page.getByText('Based on the answers you have')).toBeVisible();
            // Claiming Youth Court Fee
            await eligibleYouthCourtFee.claimYouthCourtFee(true);
            await expect(page.getByRole('heading', { name: 'Why are you claiming' })).toBeVisible();
        });

        await test.step('Filling up Claim Reason', async () => {
            // Why are you claiming
            const claimReason = new ClaimReasonPage(page);
            await claimReason.selectClaimReason();
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
            await expect(page.getByRole('heading', { name: "You've added 1 work item" })).toBeVisible();
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
            // await expect(page.locator('h2').filter({ hasText: /^£730\.71$/ })).toBeVisible();
            await expect(page.getByRole('heading', { name: '£1,449.02' })).toBeVisible({ timeout: 20000 });
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
            await expect(page.getByText('Category 1a')).toBeVisible();
            await expect(page.getByText('Guilty plea')).toBeVisible();
            await expect(page.getByText('Additional fee')).toBeVisible();
            await expect(page.getByText('Youth court fee claimed')).toBeVisible();
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
        });
    });

});

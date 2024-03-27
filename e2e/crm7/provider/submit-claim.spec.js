import { test, expect } from '@playwright/test';
import { fillDate } from '../../../helpers';
import {
    YourClaimsPage,
    WhatAreYouClaimingPage,
    YouClaimProgressPage,
    YourDetailsPage,
    DefendantDetailsPage,
    CasesDetailsPage,
    HearingDetailsPage,
    CaseDisposalPage,
    ClaimReasonPage,
    ClaimDetailsPage,
    WorkItemPage
} from '../pages/provider';
import { runTestAs } from '../../../helpers';
export default function createTests() {
    let page;
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });
    test.afterAll(async () => {
        await page.close();
    });
    // Authenticate as provider
    test.use({ storageState: runTestAs('provider') })

    // Checking current risk level
    test(' Start a new claim with No Disbursements and no uploads', async () => {
        await test.step('Starting a new claim', async () => {
            const yourClaimsPage = new YourClaimsPage(page);
            // Actions
            await yourClaimsPage.goto();
            // Expectations
            await expect(page.getByRole('button', { name: 'Start a new claim' })).toBeVisible();
            await page.getByRole('button', { name: 'Start a new claim' }).click();
        });
    });

    test('Filling up why claiming', async () => {
        const whatAreYouClaimingPage = new WhatAreYouClaimingPage(page);
        // What you are claiming for
        await expect(page.getByRole('heading', { name: 'What you are claiming for' })).toBeVisible();
        await whatAreYouClaimingPage.fillClaimForm();
        // Your claim progress
        await expect(page.getByRole('heading', { name: 'Your claim progress' })).toBeVisible();
    });

    test('Go to details and select Your details', async () => {
        const yourClaimProgressPage = new YouClaimProgressPage(page);
        await yourClaimProgressPage.clickOnYourDetails();
        // Your details
        await expect(page.getByRole('heading', { name: 'Your details' })).toBeVisible();
    });

    test('Filling up Your details', async () => {
        const yourDetails = new YourDetailsPage(page);
        yourDetails.fillYourDetails();
        // Defendant details
        await expect(page.getByRole('heading', { name: 'Defendant details' })).toBeVisible();
    });

    test('Filling up Defendant details', async () => {
        const defendantDetails = new DefendantDetailsPage(page);
        defendantDetails.addDefendant();
        await expect(page.getByRole('heading', { name: 'You added 1 defendant' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Lex Luthor' })).toBeVisible();
        // Defendant lists
        await page.getByRole('group', { name: 'Do you want to add another defendant?' }).getByLabel('No').check();
        await page.getByRole('button', { name: 'Save and continue' }).click();
        await expect(page.getByRole('heading', { name: 'Case details' })).toBeVisible();
    });

    test('Filling up Case details', async () => {
        //Case details
        const caseDetails = new CasesDetailsPage(page);
        caseDetails.fillCaseDetails();
        // Hearing details
        await expect(page.getByRole('heading', { name: 'Hearing details' })).toBeVisible();
    })

    test('Filling up Hearing details', async () => {
        // Hearing details
        const hearingDetails = new HearingDetailsPage(page);
        hearingDetails.fillHearingDetails();
        // Case Disposal
        await expect(page.getByRole('heading', { name: 'Select the case disposal' })).toBeVisible();
    });

    test('Filling up Case Disposal', async () => {
        // Case Disposal
        const caseDisposal = new CaseDisposalPage(page);
        caseDisposal.selectCaseDisposal();
        await expect(page.getByRole('heading', { name: "Why are you claiming a non-standard magistrates' court payment?" })).toBeVisible();
    });

    test('Filling up Claim Reason', async () => {
        // Why are you claiming
        const claimReason = new ClaimReasonPage(page);
        claimReason.selectClaimReason();
        await expect(page.getByRole('heading', { name: 'Claim details' })).toBeVisible();
    });

    test('Filling up Claim Details', async () => {
        // Claim details
        const claimDetails = new ClaimDetailsPage(page);
        claimDetails.fillClaimDetails();
        await expect(page.getByRole('heading', { name: 'What work item are you' })).toBeVisible();
    });

    test('Filling up Work items', async () => {
        // Work items
        const workItem = new WorkItemPage(page);
        workItem.fillWorkItem();
        // Work items list
        await expect(page.getByRole('heading', { name: 'You added 1 work item' })).toBeVisible();
        await expect(page.getByText('May 28, 2015')).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Preparation' })).toBeVisible();
        await page.getByRole('group', { name: 'Do you want to add another work item?' }).getByLabel('No').check();
        await page.getByRole('button', { name: 'Save and continue' }).click();
        await expect(page.getByRole('heading', { name: 'Letters and phone calls' })).toBeVisible();
    });

    test('Submit claim', async () => {





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
        await expect(page.locator('div').filter({ hasText: /^£635\.49$/ })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Work items total £571.41' })).toBeVisible();
        await page.getByRole('link', { name: 'Save and continue' }).click();

        // Other relevant information
        await expect(page.getByRole('heading', { name: 'Other relevant information' })).toBeVisible();
        await page.getByRole('group', { name: 'Do you want to add any other information?' }).getByLabel('No').check();
        await page.getByRole('group', { name: 'Did the proceedings conclude over 3 months ago?' }).getByLabel('No', { exact: true }).check();
        await page.getByRole('button', { name: 'Save and continue' }).click();

        // Upload supporting evidence
        await expect(page.getByRole('heading', { name: 'Upload supporting evidence' })).toBeVisible();
        await page.locator('#nsm-steps-supporting-evidence-form-send-by-post-true-field').check();
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

    });


}
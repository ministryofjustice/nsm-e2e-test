import { test, expect } from '@playwright/test';
import {
    YourClaimsPage,
    WhatAreYouClaimingPage,
    YouClaimProgressPage,
    YourDetailsPage,
    FirmAccountNumberPage,
    DefendantDetailsPage,
    CasesDetailsPage,
    HearingDetailsPage,
    CaseDisposalPage,
    ClaimReasonPage,
    ClaimDetailsPage,
    WorkItemPage
} from '../pages/provider';
import { AllClaimsPage } from '../pages/caseworker/all-claims';
import {
    authenticateAsCaseworker,
    nsmData,
    formatDate,
    authenticateAsProvider,
} from '../../../helpers';

test.describe('CRM7 - Scenario 1', () => {
    let page;
    let laaReference;
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });
    test.afterAll(async () => {
        await page.close();
    });

    // Checking current risk level
    test(' Start a new claim with No Disbursements and no uploads', async () => {
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
            await whatAreYouClaimingPage.fillClaimForm();
            // Your claim progress
            await expect(page.getByRole('heading', { name: 'Your claim progress' })).toBeVisible();

            const asideLocator = await page.locator('.aside-task-list');
            const asideText = await asideLocator.textContent();
            laaReference = asideText.split('LAA reference')[1].trim();
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
            // Expecation
            await expect(page.getByRole('heading', { name: 'Which firm account number is this application for?' })).toBeVisible();
        });

		await test.step('Select firm account number', async () => {
			const firmAccountNumberPage = new FirmAccountNumberPage(page);
			// Actions
			await firmAccountNumberPage.fillFirmAccountNumberForm();
			// Expectations
            await expect(page.getByRole('heading', { name: 'Defendant details' })).toBeVisible();
		});

        await test.step('Filling up Defendant details', async () => {
            const defendantDetails = new DefendantDetailsPage(page);
            // Actions
            await defendantDetails.addDefendant();
            //Expectations
            await expect(page.getByRole('heading', { name: 'You added 1 defendant' })).toBeVisible();
            await expect(page.getByRole('cell', { name: 'Lex Luthor' })).toBeVisible();
            // Defendant lists
            await page.getByRole('group', { name: 'Do you want to add another defendant?' }).getByLabel('No').check();
            await page.getByRole('button', { name: 'Save and continue' }).click();
            await expect(page.getByRole('heading', { name: 'Case details' })).toBeVisible();
        });

        await test.step('Filling up Case details', async () => {
            // Case details
            const caseDetails = new CasesDetailsPage(page);
            caseDetails.fillCaseDetails();
            // Hearing details
            await expect(page.getByRole('heading', { name: 'Hearing details' })).toBeVisible();
        })

        await test.step('Filling up Hearing details', async () => {
            // Hearing details
            const hearingDetails = new HearingDetailsPage(page);
            hearingDetails.fillHearingDetails();
            // Case Disposal
            await expect(page.getByRole('heading', { name: 'Select the case disposal' })).toBeVisible();
        });

        await test.step('Filling up Case Disposal', async () => {
            // Case Disposal
            const caseDisposal = new CaseDisposalPage(page);
            caseDisposal.selectCaseDisposal();
            await expect(page.getByRole('heading', { name: "Why are you claiming a non-standard magistrates' court payment?" })).toBeVisible();
        });

        await test.step('Filling up Claim Reason', async () => {
            // Why are you claiming
            const claimReason = new ClaimReasonPage(page);
            claimReason.selectClaimReason();
            await expect(page.getByRole('heading', { name: 'Claim details' })).toBeVisible();
        });

        await test.step('Filling up Claim Details', async () => {
            // Claim details
            const claimDetails = new ClaimDetailsPage(page);
            claimDetails.fillClaimDetails();
            await expect(page.getByRole('heading', { name: 'What work item are you' })).toBeVisible();
        });

        await test.step('Filling up Work items', async () => {
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
            await expect(page.locator('h2').filter({ hasText: /^£635\.49$/ })).toBeVisible();
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
        });
        // Assessing the claim
        await authenticateAsCaseworker(page);
        await test.step('View claim in caseworker app', async () => {
            const allClaimsPage = new AllClaimsPage(page);
            await allClaimsPage.goto();
            await expect(page.locator('#main-content')).toContainText(laaReference);
            await page.getByRole('link', { name: laaReference }).click();
            await page.waitForURL('**/claim_details');
            await expect(page.getByRole('heading', { name: `${nsmData.defendant.firstName} ${nsmData.defendant.lastName}` })).toBeVisible();
        });

        await test.step('Verify claim details', async () => {
            const texts = [
                `Unique file number${nsmData.uniqueFile}`,
                `Type of claim${nsmData.claimType}`,
                `Representation order date${formatDate(nsmData.repOrderDate)}`,
                `Main defendant full name${nsmData.defendant.firstName} ${nsmData.defendant.lastName}`,
                `Main defendant MAAT ID${nsmData.defendant.maatId}`,
                'Main offence nameCriminal Damage',
                `Offence date${formatDate(nsmData.mainOffenceDate)}`,
                'Assigned counselNo',
                'Unassigned counselNo',
                'Instructed agentNo',
                "Case remitted from Crown Court to magistrates' courtNo",
                'Category 1Guilty plea',
                "Why are you claiming a non-standard magistrates' payment?Enhanced rates claimed",
                `Number of pages of prosecution evidence${nsmData.evidencePages.prosecution}`,
                `Number of pages of defence statements${nsmData.evidencePages.defence}`,
                `Number of witnesses${nsmData.witnesses}`,
                'Supplemental claimNo',
                'Recorded evidenceNo',
                'Work done before order was grantedNo',
                'Work was done after last hearingNo',
                `Date of first hearing${formatDate(nsmData.hearingDate)}`,
                `Number of hearings${nsmData.hearingCount}`,
                "Magistrates' courtAberconwy PSD - C3237",
                'Court is in designated area of the firmNo',
                'Youth courtNo',
                `Hearing outcome${nsmData.hearingOutcome}`,
                `Matter type${nsmData.matterType}`,
                'Any other informationNo',
                'Proceedings concluded over 3 months agoNo',
                `Firm name${nsmData.firmName}`,
                `Firm account number${nsmData.firmAccountNumber}`,
                `Firm address${nsmData.addressLine1}${nsmData.townOrCity}${nsmData.postcode}`,
                `Solicitor full name${nsmData.solicitorFirstName} ${nsmData.solicitorLastName}`,
                `Solicitor reference number${nsmData.solicitorReferenceNumber}`,
                'Alternative contact detailsNot provided',
                'Provider email addressprovider@example.com',
                'Equality questionsNo, skip the equality questions'
            ]

            texts.forEach(async (text) => {
                await expect(page.locator('#main-content')).toContainText(text);
            });
        })

        await test.step('Verify claim is for correct amount', async () => {
            await page.getByRole('link', { name: 'Review and adjust' }).click();
            await page.waitForURL('**/adjustments');
            await expect(page.locator('#main-content')).toContainText('Total£529.58£105.92£635.49');
        });

        await test.step('Grant claim', async () => {
            await page.getByRole('link', { name: 'Make a decision' }).click();
            await page.waitForURL('**/make_decision');
            await page.getByRole('group', { name: 'What do you want to do with this claim?' })
                .getByLabel('Grant it', { exact: true }).check();
            await page.getByRole('button', { name: 'Submit decision' }).click();
            await page.waitForURL('**/closed');
            await page.getByRole('cell', { name: laaReference }).getByRole('link').click();
            await page.waitForURL('**/claim_details');
            await expect(page.locator('#main-content')).toContainText('Granted');
        });

        await test.step('View result as provider', async () => {
            await new YourClaimsPage(page).goto();
            await expect(page.locator('#main-content')).toContainText(`${laaReference} Granted`);
        });
    });

});

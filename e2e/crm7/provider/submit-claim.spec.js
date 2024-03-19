import { test, expect } from '@playwright/test';
import { fillDate } from '../../../helpers';
import {
    YourClaimsPage,
    WhatAreYouClaimingPage,
    YouClaimProgressPage,
    YourDetailsPage,
    DefendantDetailsPage,
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
    });

    test('Submit claim', async () => {
        // Defendant lists

        await page.getByRole('group', { name: 'Do you want to add another defendant?' }).getByLabel('No').check();
        await page.getByRole('button', { name: 'Save and continue' }).click();

        // Case details
        await expect(page.getByRole('heading', { name: 'Case details' })).toBeVisible();
        await page.getByLabel('Main offence').fill('crim');
        await page.getByRole('option', { name: 'Criminal Damage Criminal Damage and Arson', exact: true }).click();
        await fillDate(page, 1, 1, 2015);
        await page.getByRole('group', { name: 'Was there an assigned counsel?' }).getByLabel('No').check();
        await page.getByRole('group', { name: 'Was there an unassigned' }).getByLabel('No').check();
        await page.getByRole('group', { name: 'Was there an instructed agent?' }).getByLabel('No').check();
        await page.getByRole('group', { name: 'Has the case been remitted' }).getByLabel('No').check();
        await page.getByRole('button', { name: 'Save and continue' }).click();

        // Hearing details
        await expect(page.getByRole('heading', { name: 'Hearing details' })).toBeVisible();
        await fillDate(page, 1, 5, 2015);
        await page.getByLabel('How many hearings were held').fill('1');
        await page.getByLabel('Which court was the last case').fill('Lon');
        await page.getByRole('option', { name: "City of London Magistrates' Court" }).click();
        await page.getByRole('group', { name: 'Is this court in a designated' }).getByLabel('No').check();
        await page.getByRole('group', { name: 'Is this court a youth court?' }).getByLabel('No').check();
        await page.getByLabel('Hearing outcome').fill('CP19');
        await page.getByRole('option', { name: 'CP19 - Deferred sentence' }).click();
        // Selecting Matter type 9 - Public order offences
        await page.getByLabel('Matter type').fill('9');
        await page.getByLabel('Matter type').press('Tab');
        await page.getByRole('button', { name: 'Save and continue' }).click();

        // Case Disposal
        await expect(page.getByRole('heading', { name: 'Select the case disposal' })).toBeVisible();
        await page.getByLabel('Guilty plea', { exact: true }).check();
        await page.getByRole('button', { name: 'Save and continue' }).click();

        // Why are you claiming
        await expect(page.getByRole('heading', { name: "Why are you claiming a non-standard magistrates' court payment?" })).toBeVisible();
        await page.getByLabel('Enhanced rates claimed').check();
        await page.getByRole('button', { name: 'Save and continue' }).click();

        // Claim details
        await expect(page.getByRole('heading', { name: 'Claim details' })).toBeVisible();
        await page.getByLabel('Number of pages of prosecution evidence').fill('10');
        await page.getByLabel('Number of pages of defence').fill('10');
        await page.getByLabel('Number of witnesses').fill('1');
        await page.getByRole('group', { name: 'Does this bill represent a' }).getByLabel('No').check();
        await page.getByRole('group', { name: 'Did you spend time watching' }).getByLabel('No').check();
        await page.getByRole('group', { name: 'Did you do any work before' }).getByLabel('No').check();
        await page.getByRole('group', { name: 'Did you do any further work' }).getByLabel('No').check();
        await page.getByRole('button', { name: 'Save and continue' }).click();

        // Work item
        await expect(page.getByRole('heading', { name: 'What work item are you' })).toBeVisible();
        await page.getByLabel('Preparation').check();
        await page.getByLabel('Hours').fill('10');
        await page.getByLabel('Minutes').fill('30');
        await page.getByLabel('Day').fill('28');
        await page.getByLabel('Month').fill('05');
        await page.getByLabel('Year').fill('2015');
        await page.getByLabel('Fee earner initials').fill('SG');
        await page.getByRole('button', { name: 'Save and continue' }).click();

        // Work items list
        await expect(page.getByRole('heading', { name: 'You added 1 work item' })).toBeVisible();
        await expect(page.getByText('May 28, 2015')).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Preparation' })).toBeVisible();
        await page.getByRole('group', { name: 'Do you want to add another work item?' }).getByLabel('No').check();
        await page.getByRole('button', { name: 'Save and continue' }).click();

        // Letters and phone calls
        await expect(page.getByRole('heading', { name: 'Letters and phone calls' })).toBeVisible();
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
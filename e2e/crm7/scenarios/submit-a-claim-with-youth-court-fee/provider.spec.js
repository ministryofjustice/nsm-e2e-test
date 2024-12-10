import { test } from '../../../fixtures/global-setup';
import { ProviderTestStepsHelper } from '../../helpers/providerTestStepsHelper';
import { ExpectationHelper } from '../../helpers/expectationHelper';
import { GlobalHelper } from '../../../../helpers/globalHelper';
import { ProviderFlows } from '../../helpers/flows/providerFlows';

import {
    nsmData,
    authenticateAsProvider,
    providerPageMap
} from '../../../../helpers';

test.describe('NSM Claim for Youth court fee', () => {
    test(' Start a new claim for Youth court Fee', async ({ providerFixture }) => {
        const { page, scenarioName } = providerFixture;
        let laaReference;
        // Initialize helper
        const providerHelper = new ProviderTestStepsHelper(page);
        const expectations = new ExpectationHelper(page);
        const globalHelper = new GlobalHelper(page, providerPageMap);
        const flows = new ProviderFlows(page, providerHelper, expectations, globalHelper);

        await authenticateAsProvider(page);

        await test.step('Starting a new claim', async () => {
            await globalHelper.navigateTo('YourClaimsPage');
            await expectations.button('Start a new claim');
            await globalHelper.clickOnButton('Start a new claim');
        });

        await test.step('Filling up why claiming', async () => {
            // What you are claiming for
            await expectations.heading('What you are claiming for');
            await providerHelper.fillClaimType('fillClaimFormPostDecWithoutBOI');
        });

        await test.step('Select firm office account number', async () => {
            await expectations.heading('Which firm office account number is this claim for?');
            await providerHelper.fillAccountNumber();
        });

        await test.step('Complete office area question', async () => {
            await expectations.heading('Was this case worked on in an office in an undesignated area?');
            await providerHelper.selectOfficeArea(nsmData.officeInUndesignatedArea);
        });

        await test.step('Completing details and save LAA Reference', async () => {
            await flows.completeDetails(scenarioName);
        });


        await test.step('Checking all the possible categories are visible', async () => {
            await expectations.expectCategories([
                'Category 1A',
                'Category 1B',
                'Category 2A',
                'Category 2B'
            ]);
        });

        await test.step('Filling up Case category', async () => {
            // Case Category
            await providerHelper.selectCaseCategory('Category 1A');
            await expectations.heading('Case outcome');
        });

        await test.step('Filling up Case outcome', async () => {
            // Case Outcome
            await providerHelper.selectCaseOutcome('Guilty plea');
            await expectations.heading('Do you want to claim the');
        });

        await test.step('Filling up Eligible Youth Court Fee', async () => {
            // Eligible Youth Court Fee
            await expectations.text('Based on the answers you have provided you are eligible for the youth court additional fee.');
            await providerHelper.claimYouthCourtFee(true);
            await expectations.heading('Why are you claiming');
        });

        await test.step('Filling up Claim Reason', async () => {
            // Why are you claiming 'Enhanced rates claimed'
            await providerHelper.selectClaimReason('Enhanced rates claimed');
            await expectations.heading('Claim details');
        });

        await test.step('Complete claim details, work items, disbursements and verifying claim amount', async () => {
            await flows.completeWorkItemsAndDisbursements('£1,449.02');
        });


        await test.step('Filling up Other relevant information', async () => {
            // Other relevant information
            await expectations.heading('Other relevant information');
            await providerHelper.fillUpOtherRelevantInformation();
        });

        await test.step('Uploading supporting evidence', async () => {
            await expectations.heading('Upload supporting evidence');
            await page.locator('input#nsm-steps-supporting-evidence-form-supporting-evidence-field').setInputFiles('./e2e/fixtures/files/test.png');
            await page.getByRole('button', { name: 'Save and continue' }).click();
        });

        await test.step('Checking answers and submit', async () => {
            await flows.checkAnswersAndSubmit([
                'Category 1A',
                'Guilty plea',
                'Additional fee',
                'Youth court fee claimed',
                'Test Automate'
            ])
        });
    });

});

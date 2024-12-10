import { test, expect } from '../../../fixtures/global-setup';
import { AllClaimsPage } from '../../pages/caseworker/all-claims';
import { CaseworkerTestStepsHelper } from '../../helpers/caseworkerTestStepsHelper';

import { authenticateAsCaseworker, formatDate, nsmData } from '../../../../helpers';

test.describe('CRM7 - As a Caseworker', () => {
    test('assessing new claim with Youth court fee claimed', async ({ caseworkerFixture }) => {
        const { page, laaReference } = caseworkerFixture;
        const caseworkerHelper = new CaseworkerTestStepsHelper(page);
        // Assessing the claim
        await authenticateAsCaseworker(page);
        await test.step('View claim in caseworker app', async () => {
            await caseworkerHelper.viewClaim(laaReference);
        });

        await test.step('Verify claim details', async () => {
            const scenarioSpecificTexts = [
                `Representation order date${formatDate(nsmData.repOrderDate.youthCourtFee)}`,
                'Additional feeYouth court fee claimed',
                'Category 1AGuilty plea'
            ];
            await caseworkerHelper.verifyClaimDetails(scenarioSpecificTexts);
        })

        await test.step('Verify claim is for correct amount', async () => {
            await caseworkerHelper.verifyClaimAmount('£1,207.52', '£241.50', '£1,449.02');
        });
    });

});

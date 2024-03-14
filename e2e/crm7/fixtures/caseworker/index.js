import { test as baseTest } from '@playwright/test';
import { AllClaimsPage } from '../../pages/caseworker/all-claims';

export const test = baseTest.extend({
    laaRef: ['LAA-F0rShW', { option: true }],
    allClaimsPage: async ({ page, laaRef }, use) => {
        const allClaimsPage = new AllClaimsPage(page);
        await allClaimsPage.goto();
        // await allClaimsPage.changeRisk(laaRef);
        await use(allClaimsPage);
    },
});

export const expect = baseTest.expect;

import { test as baseTest } from '@playwright/test';
import { AllClaimsPage } from '../../pages/caseworker/all-claims-page';

export const test = baseTest.extend({
    allClaimsPage: async ({ page }, use) => {
        const allClaimsPage = new AllClaimsPage(page);
        await allClaimsPage.goto();
        await use(allClaimsPage);
    },
});

export const expect = baseTest.expect;
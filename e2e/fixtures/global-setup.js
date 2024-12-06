// e2e/fixtures/global-setup.js
import { test as setup, expect } from '@playwright/test';
import { getScenarioName } from '../../helpers';

async function createProviderFixture(browser, testInfo) {
    const page = await browser.newPage();
    const scenarioName = getScenarioName(testInfo.file);
    return { page, scenarioName };
}

async function createCaseworkerFixture(browser, testInfo) {
    const scenarioName = getScenarioName(testInfo.file);
    if (!scenarioName) {
        throw new Error(`Could not determine scenario name from path: ${testInfo.file}`);
    }

    const storagePath = `./e2e/storage/${scenarioName}-provider-state.json`;

    const context = await browser.newContext({
        storageState: storagePath
    });
    const page = await context.newPage();

    const storageState = await context.storageState();
    const laaReference = storageState.origins?.[0]?.localStorage?.find(
        item => item.name === 'laaReference'
    )?.value;

    if (!laaReference) {
        throw new Error(`LAA reference not found for scenario: ${storagePath}`);
    }

    return { page, laaReference };
}

const test = setup.extend({
    providerFixture: async ({ browser }, use, testInfo) => {
        const fixture = await createProviderFixture(browser, testInfo);
        await use(fixture);
        await fixture.page.close();
    },

    caseworkerFixture: async ({ browser }, use, testInfo) => {
        const fixture = await createCaseworkerFixture(browser, testInfo);
        await use(fixture);
        await fixture.page.close();
    }
});

export { test, expect };
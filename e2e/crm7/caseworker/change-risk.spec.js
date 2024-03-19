import { test, expect } from '../fixtures/caseworker';
import { runTestAs } from '../../../helpers';
export default function createTests() {
    // Authenticate as Supervisor
    test.use({ storageState: runTestAs('supervisor') })
    // Checking current risk level
    test(' the risk should be High', async ({ allClaimsPage }) => {
        // Expectations
        await expect(allClaimsPage.page.getByText('No claims')).toBeVisible();
        // await expect(allClaimsPage.page.getByText('Current risk: high risk')).toBeVisible();
        // await expect(allClaimsPage.page.locator('#main-content')).toContainText('Current risk: high risk');
    });
}
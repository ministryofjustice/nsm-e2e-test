import { test, expect } from '../fixtures/caseworker';
import { getAuthenticatedSupervisor } from '../../../helpers/index';

test.describe.configure({ mode: 'serial' });
test.describe('As a supervisor I want to see the correct risk level', () => {

    // Authenticate as Supervisor
    test.use({ storageState: getAuthenticatedSupervisor() })
    // Checking current risk level
    test(' the risk should be High', async ({ allClaimsPage }) => {
        await allClaimsPage.changeRisk();

        // Expectations
        await expect(allClaimsPage.page.getByText('Current risk: high risk')).toBeVisible();
        await expect(allClaimsPage.page.locator('#main-content')).toContainText('Current risk: high risk');
    });
});
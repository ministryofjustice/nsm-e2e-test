import { test, expect } from '@playwright/test';
import { runTestAs } from '../../../helpers';
import { caseworkerAppUrl } from '../../../helpers';
import {
    AllClaimsPage
} from '../pages/caseworker/all-claims';

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
    test.use({ storageState: runTestAs('caseworker') })

    test('View in caseworker app', async () => {
      const syncUrl = caseworkerAppUrl() + '/sync';
      await page.goto(syncUrl);

      const allClaimsPage = new AllClaimsPage(page);
      await allClaimsPage.goto();

      // TODO: Click the link to the claim details page and compare all details
      // with what was submitted. (This is just a proof-of-concept to show that
      // data submitted in the other app is visible here)
      await expect(page.getByText('Lex Luthor')).toBeVisible();
  });
}

/**
 * Global helper class for common page interactions
 */
export class GlobalHelper {
    /**
    * Creates an instance of GlobalHelper
    * @param {import('@playwright/test').Page} page - Playwright page object
    * @param {Object.<string, any>} pageMap - Map of page names to page classes
    * @throws {Error} If page or pageMap is not provided
    */
    constructor(page, pageMap) {
        if (!page) throw new Error('Page is required');
        if (!pageMap) throw new Error('Page map is required');
        this.page = page;
        this.pageMap = pageMap;
    }

    /**
     * Extracts LAA reference from the claim progress page
     * @throws {Error} If LAA reference cannot be extracted
     * @returns {Promise<string>} The extracted LAA reference
     * @example
     * const laaRef = await getLAAReference();
     */
    getLAAReference = async () => {
        try {
            const asideLocator = await this.page.locator('.aside-task-list');
            const asideText = await asideLocator.textContent();
            const laaReference = asideText.split('LAA reference')[1].split('Claim type')[0].trim();
            if (!laaReference) {
                throw new Error('LAA reference not found in page content');
            }
            return laaReference;
        } catch (error) {
            throw new Error(`Failed to extract LAA reference: ${error.message}`);
        }
    };

    /**
     * Navigates to a specific page using the page object map
     * @param {string} pageName - Name of the page to navigate to (e.g., 'YourClaimsPage')
     * @throws {Error} If pageName is not provided or invalid
     * @returns {Promise<void>}
     * @example
     * await navigateTo('YourClaimsPage');
     */
    navigateTo = async (pageName) => {
        if (!pageName) {
            throw new Error('Page map and page name are required');
        }

        const PageClass = this.pageMap[pageName];
        if (!PageClass) {
            throw new Error(`Unknown page: ${pageName}`);
        }

        try {
            const pageInstance = new PageClass(this.page);
            await pageInstance.goto();
        } catch (error) {
            throw new Error(`Failed to navigate to ${pageName}: ${error.message}`);
        }
    };

    /**
     * Clicks a button with the specified title
     * @param {string} buttonTitle - Text content of the button to click (e.g., 'Save and continue')
     * @param {string} [role='button'] - Role of the element (e.g., 'button', 'link')
     * @throws {Error} If button is not found or click fails
     * @returns {Promise<void>}
     * @example
     * await clickOnButton('Start a new claim');
     * await clickOnButton('Save and continue');
     */
    clickOnButton = async (buttonTitle, role = 'button') => {
        if (!buttonTitle) {
            throw new Error('Button title is required');
        }

        try {
            await this.page.getByRole(role, { name: buttonTitle }).click();
        } catch (error) {
            throw new Error(`Failed to click button "${buttonTitle}": ${error.message}`);
        }
    };
}
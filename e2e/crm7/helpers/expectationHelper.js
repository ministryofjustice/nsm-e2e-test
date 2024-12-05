import { expect } from '@playwright/test';

export class ExpectationHelper {
    constructor(page) {
        if (!page) throw new Error('Page is required');
        this.page = page;
    }

    async url(url) {
        await expect(this.page).toHaveURL(url);
    }

    async button(buttonTitle) {
        await expect(this.page.getByRole('button', { name: buttonTitle })).toBeVisible();
    }

    async heading(heading) {
        await expect(this.page.getByRole('heading', { name: heading })).toBeVisible();
    }

    async text(text) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async cellText(text) {
        await expect(this.page.getByRole('cell', { name: text })).toBeVisible();
    }

    async link(linkText) {
        await expect(this.page.getByRole('link', { name: linkText })).toBeVisible();
    }

    async group(groupName) {
        await expect(this.page.getByRole('group', { name: groupName })).toBeVisible();
    }

    /**
 * Expects multiple categories to be visible on the page
 * @param {string[]} categories - Array of category texts to check
 * @throws {Error} If any category is not visible
 * @returns {Promise<void>}
 * @example
 * await expectCategories(['Category 1A', 'Category 1B', 'Category 2A', 'Category 2B']);
 */
    async expectCategories(categories) {
        if (!Array.isArray(categories)) {
            throw new Error('Categories must be an array');
        }

        try {
            for (const category of categories) {
                await expect(
                    this.page.locator('div').filter({ hasText: new RegExp(`^${category}$`) })
                ).toBeVisible();
            }
        } catch (error) {
            throw new Error(`Failed to verify categories: ${error.message}`);
        }
    }
}
import { caseworkerAppUrl } from '../../../../helpers/index'
export class AllClaimsPage {

    constructor(page) {
        this.page = page;
    }

    async goto() {
        const url = caseworkerAppUrl() + '/claims';
        await this.page.goto(url);
    }

    async changeRisk() {
        await this.page.getByRole('link', { name: 'LAA-F0rShW' }).click();
        await this.page.getByRole('link', { name: 'Change risk' }).click();
    }
}
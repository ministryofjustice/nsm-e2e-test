import { caseworkerAppUrl } from '../../../../helpers/index'
export class AllClaimsPage {

    constructor(page) {
        this.page = page;
    }

    async goto() {
        const url = caseworkerAppUrl() + '/nsm/claims/open';
        await this.page.goto(url);
    }

    // async changeRisk(claimRef) {
    //     await this.page.getByRole('link', { name: claimRef }).click();
    //     await this.page.getByRole('link', { name: 'Change risk' }).click();
    // }
}
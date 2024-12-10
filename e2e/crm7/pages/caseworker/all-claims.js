import { caseworkerAppUrl } from '../../../../helpers/index'
export class AllClaimsPage {

    constructor(page) {
        this.page = page;
    }

    async goto() {
        const url = caseworkerAppUrl() + '/nsm/claims/open';
        await this.page.goto(url);
    }
}
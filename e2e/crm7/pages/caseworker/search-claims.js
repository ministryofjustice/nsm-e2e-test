import { caseworkerAppUrl } from '../../../../helpers/index'
export default class SearchClaimsPage {

    constructor(page) {
        this.page = page;
    }

    async goto() {
        const url = caseworkerAppUrl() + '/nsm/search/new';
        await this.page.goto(url);
    }
}
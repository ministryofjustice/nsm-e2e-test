import { caseworkerAppUrl } from '../../../../helpers/index'

export default class SearchApplicationsPage {

    constructor(page) {
        this.page = page;
    }

    async goto() {
        const url = caseworkerAppUrl() + '/prior_authority/search/new';
        await this.page.goto(url);
    }
}

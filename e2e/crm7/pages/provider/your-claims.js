import { providerAppUrl } from '../../../../helpers/index'
export default class YourClaimsPage {

    constructor(page) {
        this.page = page;
    }

    async goto() {
        const url = providerAppUrl() + '/non-standard-magistrates/claims';
        await this.page.goto(url);
    }

}
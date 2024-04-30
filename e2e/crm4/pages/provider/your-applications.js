import { providerAppUrl } from '../../../../helpers/index'
export default class YourApplicationsPage {

    constructor(page) {
        this.page = page;
    }

    async goto() {
        const url = providerAppUrl() + '/prior-authority/applications';
        await this.page.goto(url);
    }

}
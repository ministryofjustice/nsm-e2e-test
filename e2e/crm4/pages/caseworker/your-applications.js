import { caseworkerAppUrl } from "../../../../helpers";

export default class YourApplicationsPageCaseworker {

	constructor(page) {
		this.page = page;
	}
	async goto() {
		const url = caseworkerAppUrl() + '/prior_authority';
		await this.page.goto(url);
	}

}
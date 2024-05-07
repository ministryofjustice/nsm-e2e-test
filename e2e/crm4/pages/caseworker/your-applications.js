import { caseworkerAppUrl } from "../../../../helpers";

export default class YourApplicationsPage {

	constructor(page) {
		this.page = page;
	}
	async goto() {
		const url = caseworkerAppUrl() + '/prior_authority';
		await this.page.goto(url);
	}

}
export default class MakeDecisionPage {

	constructor(page) {
		this.page = page;
	}
	async grantApplication() {
		await this.page.getByLabel('Grant', { exact: true }).check();
		await this.page.getByRole('button', { name: 'Submit decision' }).click();
	}

}

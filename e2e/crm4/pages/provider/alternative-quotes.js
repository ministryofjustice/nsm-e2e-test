export default class AlternativeQuotesPage {

	constructor(page) {
		this.page = page;
	}
	async fillAlternativeQuotesForm() {
		await this.page.getByRole('group', { name: 'Have you got other quotes?' }).getByLabel('No', { exact: true }).check();
		await this.page.getByLabel('Why did you not get other').click();
		await this.page.getByLabel('Why did you not get other').fill('Test Scenario 7');
		await this.page.getByRole('button', { name: 'Save and continue' }).click();
	}

}

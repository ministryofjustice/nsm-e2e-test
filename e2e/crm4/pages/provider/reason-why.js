export default class ReasonWhyPage {

	constructor(page) {
		this.page = page;
	}
	async fillReasonWhyForm() {
		await this.page.getByLabel('Why is prior authority').click();
		await this.page.getByLabel('Why is prior authority').fill('Submitting a test case scenario 7');
		await this.page.getByRole('button', { name: 'Save and continue' }).click();
	}

}

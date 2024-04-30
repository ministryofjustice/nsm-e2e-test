export default class ApplyingTotalAmountPage {

	constructor(page) {
		this.page = page;
	}
	async fillApplyingTotalAmountForm(answer) {
		answer = answer.toString();
		await this.page.getByRole('group', { name: 'Are you applying for a total' }).getByLabel(answer).check();
		await this.page.getByRole('button', { name: 'Save and continue' }).click();
	}

}

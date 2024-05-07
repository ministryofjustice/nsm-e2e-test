export default class IsThisPrisonLawPage {

	constructor(page) {
		this.page = page;
	}
	async fillPrisonLawForm(answer) {
		answer = answer.toString();
		await this.page.getByRole('group', { name: 'Is this a Prison Law matter?' }).getByLabel(answer).check();
		await this.page.getByRole('button', { name: 'Save and continue' }).click();
	}

}

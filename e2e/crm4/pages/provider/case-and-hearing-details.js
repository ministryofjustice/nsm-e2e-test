export default class CaseAndHearingDetailsPage {

	constructor(page) {
		this.page = page;
	}
	async fillCaseAndHearingDetailsForm(answer) {
		answer = answer.toString();
		await this.page.getByRole('group', { name: 'Do you know the date of the' }).getByLabel(answer).check();
		await this.page.getByRole('button', { name: 'Save and continue' }).click();
	}

}

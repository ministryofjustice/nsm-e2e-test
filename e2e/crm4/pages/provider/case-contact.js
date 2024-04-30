import { priorAuthorityData } from '../../../../helpers/index'
export default class CaseContactPage {

	constructor(page) {
		this.page = page;
	}
	async fillCaseContactForm() {
		await this.page.getByLabel('First name').click();
		await this.page.getByLabel('First name').fill(priorAuthorityData.caseContact.firstName);
		await this.page.getByLabel('Last name').click();
		await this.page.getByLabel('Last name').fill(priorAuthorityData.caseContact.lastName);
		await this.page.getByLabel('Email address').click();
		await this.page.getByLabel('Email address').fill(priorAuthorityData.caseContact.email);
		await this.page.getByLabel('Firm name').click();
		await this.page.getByLabel('Firm name').fill(priorAuthorityData.caseContact.firmName);
		await this.page.getByRole('button', { name: 'Save and continue' }).click();
	}

}

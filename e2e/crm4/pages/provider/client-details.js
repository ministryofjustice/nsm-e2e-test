import { priorAuthorityData } from '../../../../helpers/index'
export default class ClientDetailsPage {

	constructor(page) {
		this.page = page;
	}
	async fillClientDetailsForm() {
		await this.page.getByLabel('First name').click();
		await this.page.getByLabel('First name').fill(priorAuthorityData.clientDetails.firstName);
		await this.page.getByLabel('Last name').click();
		await this.page.getByLabel('Last name').fill(priorAuthorityData.clientDetails.lastName);
		await this.page.getByLabel('Day').click();
		await this.page.getByLabel('Day').fill(priorAuthorityData.clientDetails.dob.day);
		await this.page.getByLabel('Month').click();
		await this.page.getByLabel('Month').fill(priorAuthorityData.clientDetails.dob.month);
		await this.page.getByLabel('Year').click();
		await this.page.getByLabel('Year').fill(priorAuthorityData.clientDetails.dob.year);
		await this.page.getByRole('button', { name: 'Save and continue' }).click();
	}

}

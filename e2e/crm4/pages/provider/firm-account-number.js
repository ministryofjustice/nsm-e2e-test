import { priorAuthorityData } from '../../../../helpers/index'

export default class FirmAccountNumberPage {

	constructor(page) {
		this.page = page;
	}
	async fillFirmAccountNumberForm() {
		await this.page.getByLabel(priorAuthorityData.firmAccountNumber).click();
		await this.page.getByRole('button', { name: 'Save and continue' }).click();
	}

}

import { formData } from '../../../../helpers/index'

export default class FirmAccountNumberPage {

	constructor(page) {
		this.page = page;
	}
	async fillFirmAccountNumberForm() {
		await this.page.getByLabel(formData.firmAccountNumber).click();
		await this.page.getByRole('button', { name: 'Save and continue' }).click();
	}

}

import { nsmData } from '../../../../helpers/index'

export default class FirmAccountNumberPage {

	constructor(page) {
		this.page = page;
	}
	async fillFirmAccountNumberForm() {
		await this.page.getByLabel(nsmData.firmAccountNumber).click();
		await this.page.getByRole('button', { name: 'Save and continue' }).click();
	}

}

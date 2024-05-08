import { priorAuthorityData } from '../../../../helpers/index'
export default class PrimaryQuotePage {

	constructor(page) {
		this.page = page;
	}
	async fillPrimaryQuoteForm() {
		await this.page.getByLabel('Service required').fill('Transcription');
		await this.page.getByRole('option', { name: 'Transcription (recording)' }).click();
		await this.page.getByLabel('First name').click();
		await this.page.getByLabel('First name').fill(priorAuthorityData.serviceProvider.firstName);
		await this.page.getByLabel('Last name').click();
		await this.page.getByLabel('Last name').fill(priorAuthorityData.serviceProvider.lastName);
		await this.page.getByLabel('Organisation').click();
		await this.page.getByLabel('Organisation').fill(priorAuthorityData.serviceProvider.organisation);
		await this.page.getByLabel('Town').click();
		await this.page.getByLabel('Town').fill(priorAuthorityData.serviceProvider.town);
		await this.page.getByLabel('Postcode').click();
		await this.page.getByLabel('Postcode').fill(priorAuthorityData.serviceProvider.postcode);
		await this.page.getByLabel('Upload the quote').click();
		await this.page.getByLabel('Upload the quote').setInputFiles('./e2e/fixtures/files/test.png');
		await this.page.getByRole('button', { name: 'Save and continue' }).click();
	}

}

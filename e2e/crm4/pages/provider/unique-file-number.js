import { priorAuthorityData } from '../../../../helpers/index'
export default class UniqueFileNumberPage {

	constructor(page) {
		this.page = page;
	}
	async fillUniqueFileNumberForm() {
		await this.page.getByLabel('What is your unique file').click();
		await this.page.getByLabel('What is your unique file').fill(priorAuthorityData.ufn);
		await this.page.getByRole('button', { name: 'Save and continue' }).click();
	}

}

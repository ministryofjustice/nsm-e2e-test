import { priorAuthorityData } from '../../../../helpers/index'
export default class ServiceCostPage {
	constructor(page) {
		this.page = page;
	}
	async fillServiceCostForm() {
		await this.page.getByRole('group', { name: 'Have you already been granted' }).getByLabel(priorAuthorityData.serviceCost.granted).check();
		await this.page.getByLabel('Number of minutes').dblclick();
		await this.page.getByLabel('Number of minutes').click();
		await this.page.getByLabel('Number of minutes').fill(priorAuthorityData.serviceCost.serviceType.numberOfMinutes);
		await this.page.getByLabel('What is the cost per minute?').click();
		await this.page.getByLabel('What is the cost per minute?').fill(priorAuthorityData.serviceCost.serviceType.costPerMinute);
		await this.page.getByRole('button', { name: 'Update calculation' }).click();
		await this.page.getByRole('button', { name: 'Save and continue' }).click();
	}

}

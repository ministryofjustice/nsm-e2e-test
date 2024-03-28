import { formData } from '../../../../helpers/index'
export default class DefendantDetailsPage {

    constructor(page) {
        this.page = page;
    }

    async addDefendant() {
        await this.page.getByLabel('First name').fill(formData.defendant.firstName);
        await this.page.getByLabel('Last name').fill(formData.defendant.lastName);
        await this.page.getByLabel('MAAT ID').fill(formData.defendant.maatId);
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}
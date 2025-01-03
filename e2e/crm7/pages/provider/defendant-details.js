import { nsmData } from '../../../../helpers/index'
export default class DefendantDetailsPage {

    constructor(page) {
        this.page = page;
    }

    addDefendant = async () => {
        await this.page.getByLabel('First name').fill(nsmData.defendant.firstName);
        await this.page.getByLabel('Last name').fill(nsmData.defendant.lastName);
        await this.page.getByLabel('MAAT ID number').fill(nsmData.defendant.maatId);
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

    addDefendantWithBoi = async () => {
        await this.page.getByLabel('First name').fill(nsmData.defendant.firstName);
        await this.page.getByLabel('Last name').fill(nsmData.defendant.lastName);
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}

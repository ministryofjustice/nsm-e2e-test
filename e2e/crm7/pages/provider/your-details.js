import { nsmData } from '../../../../helpers/index'
export default class YourDetailsPage {

    constructor(page) {
        this.page = page;
    }

    async fillYourDetails() {
        await this.page.getByLabel('Firm name').fill(nsmData.firmName);
        await this.page.getByLabel('Address line 1').fill(nsmData.addressLine1);
        await this.page.getByLabel('Town or city').fill(nsmData.townOrCity);
        await this.page.getByLabel('Postcode').fill(nsmData.postcode);
        await this.page.getByRole('group', { name: 'Is your firm VAT registered?' }).getByLabel('Yes').check();
        await this.page.getByLabel('Solicitor first name').fill(nsmData.solicitorFirstName);
        await this.page.getByLabel('Solicitor last name').fill(nsmData.solicitorLastName);
        await this.page.getByLabel('Solicitor reference number').fill(nsmData.solicitorReferenceNumber);
        await this.page.getByRole('group', { name: 'Do you want to add' }).getByLabel('No').check();
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}

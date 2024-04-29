import { formData } from '../../../../helpers/index'
export default class YourDetailsPage {

    constructor(page) {
        this.page = page;
    }

    async fillYourDetails() {
        await this.page.getByLabel('Firm name').fill(formData.firmName);
        await this.page.getByLabel('Address line 1').fill(formData.addressLine1);
        await this.page.getByLabel('Town or city').fill(formData.townOrCity);
        await this.page.getByLabel('Postcode').fill(formData.postcode);
        await this.page.getByRole('group', { name: 'Is your firm VAT registered?' }).getByLabel('Yes').check();
        await this.page.getByLabel('Solicitor first name').fill(formData.solicitorFirstName);
        await this.page.getByLabel('Solicitor last name').fill(formData.solicitorLastName);
        await this.page.getByLabel('Solicitor reference number').fill(formData.solicitorReferenceNumber);
        await this.page.getByRole('group', { name: 'Do you want to add' }).getByLabel('No').check();
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}

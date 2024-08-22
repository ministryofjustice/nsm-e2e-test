import { nsmData } from '../../../../helpers/index'
export default class ContactDetailsPage {

    constructor(page) {
        this.page = page;
    }

    async fillYourDetails() {
        await this.page.getByLabel('First name').fill(nsmData.contactFirstName);
        await this.page.getByLabel('Last name').fill(nsmData.contactLastName);
        await this.page.getByLabel('Email address').fill(nsmData.contactEmailAddress);
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}

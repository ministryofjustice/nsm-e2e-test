import { fillDate, formData } from '../../../../helpers/index'
export default class WhatAreYouClaimingPage {

    constructor(page) {
        this.page = page;
    }
    async fillClaimForm() {
        await this.page.getByLabel('What is your unique file').fill(formData.uniqueFile);
        await this.page.getByText(formData.claimType, { exact: true }).click();
        await fillDate(this.page, formData.repOrderDate.day, formData.repOrderDate.month, formData.repOrderDate.year);
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}

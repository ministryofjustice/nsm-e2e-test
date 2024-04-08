import { fillDate, formData } from '../../../../helpers/index'
export default class WhatAreYouClaimingPage {

    constructor(page) {
        this.page = page;
    }
    async fillClaimForm() {
        await this.page.getByLabel('What is your unique file').fill(formData.uniqueFile);
        await this.page.getByText(formData.claimType, { exact: true }).click();
        await fillDate(this.page, formData.rep_order_date.day, formData.rep_order_date.month, formData.rep_order_date.year);
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}
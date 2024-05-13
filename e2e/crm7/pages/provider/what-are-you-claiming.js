import { fillDate, nsmData } from '../../../../helpers/index'
export default class WhatAreYouClaimingPage {

    constructor(page) {
        this.page = page;
    }
    async fillClaimForm() {
        await this.page.getByLabel('What is your unique file').fill(nsmData.uniqueFile);
        await this.page.getByText(nsmData.claimType, { exact: true }).click();
        await fillDate(this.page, nsmData.repOrderDate.day, nsmData.repOrderDate.month, nsmData.repOrderDate.year);
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}

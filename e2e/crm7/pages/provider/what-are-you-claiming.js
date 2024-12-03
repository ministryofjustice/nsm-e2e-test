import { fillDate, nsmData } from '../../../../helpers/index'
export default class WhatAreYouClaimingPage {

    constructor(page) {
        this.page = page;
    }
    async fillClaimForm() {
        const repOrderDate = nsmData.repOrderDate.default;
        await this.page.getByLabel('What is your unique file').fill(nsmData.uniqueFile);
        await this.page.getByText(nsmData.claimType.nsm, { exact: true }).click();
        await fillDate(this.page, repOrderDate.day, repOrderDate.month, repOrderDate.year);
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

    async fillClaimFormPostDecWithoutBOI() {
        const repOrderDate = nsmData.repOrderDate.youthCourtFee;
        await this.page.getByLabel('What is your unique file').fill(nsmData.uniqueFile);
        await this.page.getByText(nsmData.claimType.nsm, { exact: true }).click();
        await fillDate(this.page, repOrderDate.day, repOrderDate.month, repOrderDate.year);
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

    async fillClaimFormPostDecWithBOI() {
        const repOrderDate = nsmData.breachOfInjunction.repOrderDate;
        await this.page.getByLabel('What is your unique file').fill(nsmData.uniqueFile);
        await this.page.getByText(nsmData.claimType.boi, { exact: true }).click();
        await this.page.getByLabel('Clients CNTP (contempt) number').fill(nsmData.breachOfInjunction.cntp);
        await fillDate(this.page, repOrderDate.day, repOrderDate.month, repOrderDate.year);
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}

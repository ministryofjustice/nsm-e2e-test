import { fillDate, nsmData } from '../../../../helpers/index'
export default class WhatAreYouClaimingPage {

    /**
       * Creates an instance of EligibleYouthCourtFeePage
       * @param {import('@playwright/test').Page} page - Playwright page object
       * @throws {Error} If page is not provided
       */
    constructor(page) {
        if (!page) throw new Error('Page is required');
        this.page = page;
    }

    fillClaimForm = async () => {
        const repOrderDate = nsmData.repOrderDate.default;
        await this.page.getByText(nsmData.claimType.nsm, { exact: true }).click();
        await this.page.getByText('Save and continue').click();
        await this.page.getByLabel('What is your unique file').fill(nsmData.uniqueFile);
        await fillDate(this.page, repOrderDate.day, repOrderDate.month, repOrderDate.year);
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

    fillClaimFormWithBOI = async () => {
        const repOrderDate = nsmData.breachOfInjunction.repOrderDate.default;
        await this.page.getByText(nsmData.claimType.boi, { exact: true }).click();
        await this.page.getByText('Save and continue').click();
        await this.page.getByLabel('What is your unique file').fill(nsmData.uniqueFile);
        await this.page.getByLabel('Clients CNTP (contempt) number').fill(nsmData.breachOfInjunction.cntp);
        await fillDate(this.page, repOrderDate.day, repOrderDate.month, repOrderDate.year);
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

    fillClaimFormPostDecWithoutBOI = async () => {
        const repOrderDate = nsmData.repOrderDate.youthCourtFee;
        await this.page.getByText(nsmData.claimType.nsm, { exact: true }).click();
        await this.page.getByText('Save and continue').click();
        await this.page.getByLabel('What is your unique file').fill(nsmData.uniqueFile);
        await fillDate(this.page, repOrderDate.day, repOrderDate.month, repOrderDate.year);
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

    fillClaimFormPostDecWithBOI = async () => {
        const repOrderDate = nsmData.breachOfInjunction.repOrderDate.youthCourtFee;
        await this.page.getByText(nsmData.claimType.boi, { exact: true }).click();
        await this.page.getByText('Save and continue').click();
        await this.page.getByLabel('What is your unique file').fill(nsmData.uniqueFile);
        await this.page.getByLabel('Clients CNTP (contempt) number').fill(nsmData.breachOfInjunction.cntp);
        await fillDate(this.page, repOrderDate.day, repOrderDate.month, repOrderDate.year);
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}

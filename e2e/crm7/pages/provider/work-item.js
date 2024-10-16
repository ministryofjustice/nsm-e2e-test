export default class WorkItemPage {

    constructor(page) {
        this.page = page;
    }

    async fillWorkItem() {
        // Work item
        await this.page.getByLabel('Preparation').check();
        await this.page.getByLabel('Hours').fill('10');
        await this.page.getByLabel('Minutes').fill('30');
        await this.page.getByLabel('Day').fill('28');
        await this.page.getByLabel('Month').fill('05');
        await this.page.getByLabel('Year').fill('2015');
        await this.page.getByLabel('Fee earner initials').fill('SG');
        await this.page.getByRole('group', { name: 'Do you need to add another work item?' })
                       .getByLabel('No').check();
        await this.page.getByRole('button', { name: 'Save and continue' }).click();
    }

}

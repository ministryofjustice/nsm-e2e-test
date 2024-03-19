require('dotenv').config();

// write function to export supervisor file so i can use it in the test
export function runTestAs(role) {
    if (role === 'supervisor') {
        return 'playwright/.auth/supervisor.json';
    } else if (role === 'caseworker') {
        return 'playwright/.auth/caseworker.json';
    } else if (role === 'provider') {
        return 'playwright/.auth/provider.json';
    }
}

export function caseworkerAppUrl() {
    return process.env.NSCC_CASEWORKER_URL;
}

export function providerAppUrl() {
    return process.env.NSCC_PROVIDER_URL;
}

export const formData = {
    uniqueFile: '120223/001',
    claimType: 'Non-standard magistrates\' court payment',
    rep_order_date: {
        day: '27',
        month: '3',
        year: '2021'
    },
    firmName: 'Test Automate',
    firmAccountNumber: '12345678',
    addressLine1: '102 Petty France',
    townOrCity: 'London',
    postcode: 'SW1H 9AJ',
    vatRegistered: 'Yes',
    solicitorFullName: 'Any Testname',
    solicitorReferenceNumber: '2P341B',
    addAnotherSolicitor: 'No',
    defendant: {
        firstName: 'Lex',
        lastName: 'Luthor',
        maatId: '1234'
    }
};

export async function fillDate(page, day, month, year) {
    await page.getByRole('textbox', { name: 'Day' }).fill(day.toString());
    await page.getByRole('textbox', { name: 'Month' }).fill(month.toString());
    await page.getByRole('textbox', { name: 'Year' }).fill(year.toString());
}

// Helper function to save current URL to local storage
export async function saveCurrentUrl(page) {
    const currentUrl = await page.url();
    await page.evaluate((url) => {
        localStorage.setItem('savedUrl', url);
    }, currentUrl);
}

// Helper function to get saved URL from local storage
export async function getSavedUrl(page) {
    return await page.evaluate(() => localStorage.getItem('savedUrl'));
}
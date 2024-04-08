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
    repOrderDate: {
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
    solicitorFirstName: 'Any',
    solicitorLastName: 'Testname',
    solicitorReferenceNumber: '2P341B',
    addAnotherSolicitor: 'No',
    defendant: {
        firstName: 'Lex',
        lastName: 'Luthor',
        maatId: '1234'
    },
    mainOffenceDate: {
        day: '1',
        month: '1',
        year: '2015'
    },
    hearingDate: {
        day: '1',
        month: '5',
        year: '2015'
    },
    hearingCount: '1',
    hearingOutcome: 'CP19',
    matterType: '9',
    evidencePages: {
        prosecution: '10',
        defence: '10',
    },
    witnesses: '1',

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

export function formatDate(dateObject) {
    const date = new Date(dateObject.year, dateObject.month - 1, dateObject.day);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

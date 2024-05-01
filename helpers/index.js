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

export function caseworkerAppUrl(path = '') {
    return `${process.env.NSCC_CASEWORKER_URL}${path}`;
}

export function providerAppUrl(path = '') {
    return `${process.env.NSCC_PROVIDER_URL}${path}`;
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
    firmAccountNumber: '1A123B',
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
        maatId: '1234567'
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

export const priorAuthorityData = {
    ufn: '120223/001',
    caseContact: {
        firstName: 'Clark',
        lastName: 'Kent',
        email: 'superman@krypton.com',
        firmName: 'Daily Planet',
    },
    clientDetails: {
        firstName: 'Bruce',
        lastName: 'Wayne',
        dob: {
            day: '1',
            month: '1',
            year: '1980'
        }
    },
    serviceProvider: {
        firstName: 'Barry',
        lastName: 'Allen',
        organisation: 'Central City Police Department',
        postcode: 'SW1H 9AJ',
    },
    serviceCost: {
        granted: 'No',
        serviceType: {
            name: 'Transcription (recording)',
            numberOfMinutes: '10',
            costPerMinute: '5.00',
        }
    }
};
export async function fillDate(page, day, month, year) {
    await page.getByRole('textbox', { name: 'Day' }).fill(day.toString());
    await page.getByRole('textbox', { name: 'Month' }).fill(month.toString());
    await page.getByRole('textbox', { name: 'Year' }).fill(year.toString());
}

// Helper function to save Laa Reference to local storage
export async function saveToStorage(page, reference, data) {
    await page.evaluate(({ ref, value }) => localStorage.setItem(ref, value), { ref: reference, value: data });
}

// Helper function to get saved laaReference from local storage
export async function getFromStorage(page, reference) {
    return await page.evaluate(({ ref }) => localStorage.getItem(ref), { ref: reference });
}

export function formatDate(dateObject) {
    const date = new Date(dateObject.year, dateObject.month - 1, dateObject.day);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

export async function authenticateAsCaseworker(page) {
    await page.goto(caseworkerAppUrl());
    await page.getByLabel('Pick an account:').selectOption('case.worker@test.com');
    await page.getByRole('button', { name: 'Sign in' }).click();
}

export async function authenticateAsSupervisor(page) {
    await page.goto(caseworkerAppUrl());
    await page.getByLabel('Pick an account:').selectOption('super.visor@test.com');
    await page.getByRole('button', { name: 'Sign in' }).click();
}

export async function authenticateAsProvider(page) {
    await page.goto(providerAppUrl());
    await page.getByRole('button', { name: 'Log in as provider with single office code' }).click();
}

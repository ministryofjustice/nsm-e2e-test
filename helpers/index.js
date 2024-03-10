require('dotenv').config();

// write function to export supervisor file so i can use it in the test
export function runTestAs(role) {
    if (role === 'supervisor') {
        return 'playwright/.auth/supervisor.json';
    } else if (role === 'caseworker') {
        return 'playwright/.auth/caseworker.json';
    }
}

export function caseworkerAppUrl() {
    return process.env.NSCC_CASEWORKER_URL;
}

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
    if (process.env.CIRCLECI) {
        return process.env.NSM_ASSESS_DEV_URL_LOCAL;
    } else {
        return process.env.NSM_ASSESS_DEV_URL;
    }
}

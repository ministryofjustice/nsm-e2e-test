require('dotenv').config();

// write function to export supervisor file so i can use it in the test
export function getAuthenticatedSupervisor() {
    return 'playwright/.auth/supervisor.json';
}

export function getAuthenticatedCaseworker() {
    return 'playwright/.auth/caseworker.json';
}

export function caseworkerAppUrl() {
    return process.env.NSM_ASSESS_DEV_URL;
}

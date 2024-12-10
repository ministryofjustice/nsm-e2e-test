export function caseworkerAppUrl(path = '') {
    return `${process.env.NSCC_CASEWORKER_URL}${path}`;
}

export function providerAppUrl(path = '') {
    return `${process.env.NSCC_PROVIDER_URL}${path}`;
}
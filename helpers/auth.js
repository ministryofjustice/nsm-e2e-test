import { caseworkerAppUrl, providerAppUrl } from './appUrl';

export const authenticateAsCaseworker = async (page) => {
    await page.goto(caseworkerAppUrl());
    await page.getByLabel('Pick an account:').selectOption('case.worker@test.com');
    await page.getByRole('button', { name: 'Sign in' }).click();
}

export const authenticateAsSupervisor = async (page) => {
    await page.goto(caseworkerAppUrl());
    await page.getByLabel('Pick an account:').selectOption('super.visor@test.com');
    await page.getByRole('button', { name: 'Sign in' }).click();
}

export const authenticateAsProvider = async (page) => {
    await page.goto(providerAppUrl());
    await page.getByRole('button', { name: 'Log in as primary test user (CRM7/4/5)' }).click();
}

export const runTestAs = (role) => {
    const roleMap = {
        supervisor: 'playwright/.auth/supervisor.json',
        caseworker: 'playwright/.auth/caseworker.json',
        provider: 'playwright/.auth/provider.json'
    };

    if (!roleMap[role]) {
        throw new Error(`Invalid role: ${role}`);
    }

    return roleMap[role];
}
export const storeLAAReference = async (page, laaReference, scenarioName, storagePath = `./e2e/storage/${scenarioName}-provider-state.json`) => {
    if (!page || !laaReference || !scenarioName) {
        throw new Error('Page, LAA reference, and scenario name are required');
    }

    try {
        await page.evaluate((ref) => {
            localStorage.setItem('laaReference', ref);
        }, laaReference);

        await page.context().storageState({ path: storagePath });
    } catch (error) {
        console.error(`Failed to store LAA reference for scenario ${scenarioName}:`, error);
        throw error;
    }
};

export const getLAAReference = async (page, scenarioName, storagePath = `./e2e/storage/${scenarioName}-provider-state.json`) => {
    try {
        await page.context().storageState({ path: storagePath });
        return await page.evaluate(() => localStorage.getItem('laaReference'));
    } catch (error) {
        console.error(`Failed to get LAA reference for scenario ${scenarioName}:`, error);
        throw error;
    }
};

export const getScenarioName = (filePath) => {
    // Extract scenario name from path structure: e.g. 'submit-a-claim' from '.../scenarios/submit-a-claim/...'
    const match = filePath.match(/scenarios\/([^/]+)/);
    return match ? match[1] : null;
};
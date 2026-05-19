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

export const extractLAAReference = (text, marker) => {
    if (!text || !marker) {
        throw new Error('Text and reference marker are required');
    }

    const markerIndex = text.indexOf(marker);
    if (markerIndex === -1) {
        throw new Error(`Could not find LAA reference marker: ${marker}`);
    }

    const reference = text.slice(markerIndex + marker.length).trim().split(/\s+/)[0];
    if (!reference) {
        throw new Error(`Could not find LAA reference after marker: ${marker}`);
    }

    return reference;
};

export const getLAAReferenceFromPage = async (page, marker) => {
    const pageText = await page.getByRole('main').textContent();
    return extractLAAReference(pageText, marker);
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
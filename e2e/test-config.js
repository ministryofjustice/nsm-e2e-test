require('dotenv').config();
const { devices } = require('@playwright/test');

const scenarioConfig = (scenarioName, applicationType) => ({
    provider: {
        name: `provider-${scenarioName}`,
        testMatch: `**/${applicationType}/scenarios/${scenarioName}/provider.spec.js`,
        use: { ...devices['Desktop Chrome'] },
        dependencies: ['setup']
    },
    caseworker: {
        name: `caseworker-${scenarioName}`,
        testMatch: `**/${applicationType}/scenarios/${scenarioName}/caseworker.spec.js`,
        use: { ...devices['Desktop Chrome'] },
        dependencies: [`provider-${scenarioName}`]
    }
});

exports.testConfig = {
    testDir: './e2e',
    fullyParallel: true,
    workers: 5,
    projects: [
        {
            name: 'setup',
            testMatch: /.*\.setup\.js/
        },
        // Scenario : NSM Submit and assess a claim
        scenarioConfig('submit-and-assess-claim', 'crm7').provider,
        scenarioConfig('submit-and-assess-claim', 'crm7').caseworker,
        // Scenario : NSM Submit a claim with Youth Court fee claimed
        scenarioConfig('submit-a-claim-with-youth-court-fee', 'crm7').provider,
        scenarioConfig('submit-a-claim-with-youth-court-fee', 'crm7').caseworker,
        // Scenario : NSM Submit a claim with Breach of Injunction post Dec
        scenarioConfig('submit-a-claim-with-boi', 'crm7').provider,
        // Scenario : PA Submit an application that is not Prison Law and less than £100
        scenarioConfig('not-prison-matter-and-less-than-100', 'crm4').provider,
        // Scenario: PA Submit an application that is a Prison Law Matter and less than £500
        scenarioConfig('prison-matter-and-less-than-500', 'crm4').provider,
        // Scenario : PA Submit and assess a claim
        scenarioConfig('submit-and-assess-application', 'crm4').provider,
        scenarioConfig('submit-and-assess-application', 'crm4').caseworker,

    ]
};
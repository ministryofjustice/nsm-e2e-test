// e2e/helpers/index.js

// Authentication helpers
export {
    authenticateAsCaseworker,
    authenticateAsSupervisor,
    authenticateAsProvider,
    runTestAs
} from './auth';

// URL helpers
export {
    caseworkerAppUrl,
    providerAppUrl
} from './appUrl';

// Form helpers
export {
    fillDate,
    formatDate
} from './formHelper';

// Storage helpers
export {
    storeLAAReference,
    getLAAReference,
    getScenarioName
} from './storage';

// Test data
export {
    nsmData,
    priorAuthorityData
} from './data';
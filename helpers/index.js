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

// Utils
export {
    convertToBoolean,
    fillDate,
    formatDate
} from './utils';

// Form helpers
export {
    selectRadioButton,
} from './formHelper';

// Page Map
export {
    providerPageMap,
} from './pageMap';
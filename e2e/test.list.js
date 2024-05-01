import { test } from '@playwright/test';
import submitClaimTests from './crm7/provider/submit-claim.spec.js';
import interruptedJourneyTests from './crm4/provider/interrupted-journey.spec.js';
import submitApplicationTests from './crm4/provider/submit-an-application.spec.js';
import makeADecisionTests from './crm4/caseworker/make-a-decision.spec.js';
// CRM4 Scenarios
// Provider
test.describe(interruptedJourneyTests);
test.describe(submitApplicationTests);
// Caseworker
test.describe(makeADecisionTests);
// CRM7 Scenarios
test.describe(submitClaimTests);

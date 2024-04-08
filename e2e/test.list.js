import { test } from '@playwright/test';
import submitClaimTests from './crm7/provider/submit-claim.spec.js';
import viewSubmittedClaimTests from './crm7/caseworker/view-submitted-claim.spec.js';

test.describe(submitClaimTests);
test.describe(viewSubmittedClaimTests);

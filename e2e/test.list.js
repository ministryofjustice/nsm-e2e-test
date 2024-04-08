import { test } from '@playwright/test';
import changeRiskTests from './crm7/caseworker/change-risk.spec.js';
import submitClaimTests from './crm7/provider/submit-claim.spec.js';

test.describe(submitClaimTests);
// test.describe(changeRiskTests);
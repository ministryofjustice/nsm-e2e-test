import { test } from '@playwright/test';
import submitClaimTests from './crm7/provider/submit-claim.spec.js';
import notPrisonMatterTests from './crm4/provider/not-prison-matter.spec.js';
import submitApplicationTests from './crm4/provider/submit-an-application.spec.js';
test.describe(notPrisonMatterTests);
test.describe(submitApplicationTests);
test.describe(submitClaimTests);

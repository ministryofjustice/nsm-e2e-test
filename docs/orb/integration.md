# Integrating end-to-end tests

The orb published by the end-to-test repository can be used to integrate the tests into the various crime form apps. This will help to ensure that one app change does not introduce a breaking change into another part of the overall crime form journey.

Our typical use of the end-to-end tests is run against

- a branch with an open pull request
- once that pull request is merged into the main branch.

Both use cases can use the orb as so:

```yml
orbs:
  crime-forms-end-to-end-tests: ministryofjustice/crime-forms-end-to-end-tests@volatile
```

The `@volatile` tag uses the "latest" version of the production orb. You can alternatively pin it to a specific release, suffix `@0.0.01`, latest dev release, suffix `@dev:alpha` or shah specific dev release, suffix `@dev:8fe6cd1` (first 7 chars of circleci shah).

## Testing a branch

The first use case requires using a docker image of the branch of the "current" repo in the tests alongside the `latest` docker images of the other crime form apps.

To achieve this you can use the following CircleCI job definition

```yml
jobs:
  e2e-test-branch:
    executor: crime-forms-end-to-end-tests/e2e-test-executor
    steps:
      - crime-forms-end-to-end-tests/run-e2e-tests:
          e2e_current_image_var: NSCC_PROVIDER_IMAGE
          e2e_current_image: ${AWS_ECR_REGISTRY_ID}.dkr.ecr.${ECR_REGION}.amazonaws.com/${PROVIDER_ECR_REPOSITORY}:branch-${CIRCLE_SHA1}
          e2e_branch: main # Change to work against a fixed e2e test repo branch if needed
---
workflows:
  my-workflow:
    jobs:
      - e2e-test-branch:
          context: laa-crime-forms-e2e-tests
          requires:
            - blah
          filters: blah
```

To break it down:

```yml
e2e_current_image_var: NSCC_PROVIDER_IMAGE
```

This specifies that we want to replace the provider apps docker image

```yml
e2e_current_image: ${AWS_ECR_REGISTRY_ID}.dkr.ecr.${ECR_REGION}.amazonaws.com/${PROVIDER_ECR_REPOSITORY}:branch-${CIRCLE_SHA1}
```

This provides the docker image to use in place of the`latest` image for that app.

```yml
e2e_branch: main # Change to work against a fixed e2e test repo branch if needed
```

This defaults to `main` and does not need to be specified. However, it allows us to overide the branch of the end-to-end test suite to use if breaking changes are being made to the branch and you wih to test against a branch of the end-to-end test repo to fix

```yml
context: laa-crime-forms-e2e-tests
```

This context contains the required ECR repository name and role access secrets

## Testing after merge

The second use case requires using the `latest` image of the "current" repo as well as the `latest` docker images of the other crime form apps. This is the standard end-to-end test!

To achieve this you can use the following CircleCI job definition

```yml
jobs:
  e2e-test-main:
    executor: crime-forms-end-to-end-tests/e2e-test-executor
    steps:
      - crime-forms-end-to-end-tests/run-e2e-tests
---
workflows:
  my-workflow:
    jobs:
      - e2e-test-main:
          context: laa-crime-forms-e2e-tests
          requires:
            - blah
          filters: blah
```

This simply calls the end-to-end tests as they would be run in the end-to-end repository itself.

As for the branch testing the context is required for ECR repository name and role access secrets.

```yml
context: laa-crime-forms-e2e-tests
```

## Suggested workflow for integration breakages

If an integrated run of the e2e tests in another repo occurs you should first identify the cause.

The cause is likely to fall into one of two areas

- a change to the UI of the app on which the e2e tests failed
- a change to the payload of the app causing a breakage in the other apps

If the cause is the result of changes to the UI of the app on which the e2e tests failed then a suggested workflow would be:

1. checkout a branch of the end-to-end tests (this repository)
2. add a commit to the "consuming" app's branch to run the e2e test using the new e2e branch

This is done by amending the `e2e_branch` value to your new branch name:

```sh
  # Amend the job in the consuming app to point it at the new e2e test suite branch
  e2e-test-branch:
    ...
    steps:
      - crime-forms-end-to-end-tests/run-e2e-tests:
          ...
          e2e_branch: main # Change to work against a fixed e2e test repo branch if needed
          =>
          e2e_branch: my-branch-of-e2e-tests
```

3.  Amend the e2e test suite branch to fix the tests

4.  Have both the comsumer app and e2e test suite pull requests reviewed and approved (ready to go)

5.  Merge the e2e test suite branch's PR
6.  Amend the [already approved] consuming app's PR to change `e2e_branch` back to `main` and then merge as soon as possible \*

\* _you should merge asap so as not to break other consuming app branchs._

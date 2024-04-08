#!/bin/bash
# Exit immediately if there is an error
set -e
export DOCKER_FILES="-f docker-compose.yml -f docker-compose.local.yml"

export DOCKER_BUILDKIT=0

function start_applications {
  docker-compose $DOCKER_FILES run start_applications
}

function run_tests {
  docker-compose up --build laa-crime-forms-end-to-end-tests
}

docker-compose $DOCKER_FILES down
start_applications
run_tests


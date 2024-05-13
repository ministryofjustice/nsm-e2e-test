#!/bin/bash
# Exit immediately if there is an error
set -e
export DOCKER_FILES="-f docker-compose.yml -f docker-compose.local.yml"

if [[ $(uname -m) == 'arm64' ]];
then
  echo "Apple Silicon detected"
  export DOCKER_BUILDKIT=1
  export LOCAL_PLATFORM=linux/amd64
else
  export DOCKER_BUILDKIT=0
fi

function teardown {
  # stop and remove containers with all images, networks and volumes
  docker-compose $DOCKER_FILES down --volumes --rmi "all"
}

function start_app_store {
  docker-compose $DOCKER_FILES run start_app_store
}

function start_applications {
  docker-compose $DOCKER_FILES run start_applications
}

function run_tests {
  docker-compose up --build laa-crime-forms-end-to-end-tests
}

teardown
start_app_store
start_applications
run_tests


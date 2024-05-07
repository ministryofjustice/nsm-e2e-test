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

function build {
  # stop and remove the container with all the networks and volumes
  docker-compose down -v
  docker-compose $DOCKER_FILES up -d --build --pull "always" --force-recreate
}

function shellin {
  docker-compose run --entrypoint sh laa-crime-forms-end-to-end-tests
}

build
shellin
# now run `npx playwright test --trace on` in container

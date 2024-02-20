# Get the base image of Node version 16
FROM node:21

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:focal

# Set the working directory in the container to /app
WORKDIR /app

# Set the environment variables for the test [ need to pass it from somewhere]
ENV NSM_ASSESS_DEV_URL=https://nsmassessdev.apps.live.cloud-platform.service.justice.gov.uk/
ENV NSM_CLAIMS_DEV_URL=https://crm7dev.apps.live.cloud-platform.service.justice.gov.uk/

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Get the needed libraries to run Playwright
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

# Get the necessary tools to run the AWS-CLI
RUN apt-get install unzip
# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Run the e2e-test when the container launches
CMD ["npm", "run", "e2e-test"]
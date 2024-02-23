# Get the base image of Node version 16
FROM node:16

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.41.1-jammy

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Get the needed libraries to run Playwright
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev net-tools iputils-ping

# Get the necessary tools to run the AWS-CLI
RUN apt-get install unzip
# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Run the e2e-test when the container launches
CMD ["npm", "run", "e2e-test"]
# Use an official Node.js runtime as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the application code to the working directory
COPY . .

# Define the command to run the app
CMD ["/bin/bash", "-c", "npm i && npm run build && npm i -g serve && serve -s build"]

# Development Mode
# CMD ["/bin/bash", "-c", "npm i && npm run start"]
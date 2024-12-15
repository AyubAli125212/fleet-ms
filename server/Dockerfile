# Specify the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy all the project files into the container
COPY . .

# Command to run the application
CMD ["npm", "start"]

# Expose the port the app runs on
EXPOSE 8000

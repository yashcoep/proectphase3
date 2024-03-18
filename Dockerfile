# Use the official Node.js image as the base image
FROM node:20.11.1

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Install Azure SQL Edge
RUN apt-get update && \
    apt-get install -y curl && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y msodbcsql17 mssql-tools && \
    apt-get install -y unixodbc-dev

# Copy application code to work directory
COPY . .

# Expose port 3000 for the Node.js application
EXPOSE 3000

# Expose port 1433 for the Azure SQL Edge database
EXPOSE 1433

# Command to run the Node.js application
CMD ["node", "server.js"]

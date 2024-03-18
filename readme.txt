Setting Up Qutation generator web site
Follow these steps to set up Qutation generator web service:
Pre-requiste: Docker Desktop or equivalent docker application installed on your system.


1. Pull Azure SQL Docker Image: Pull the Azure SQL Edge Docker image using the following command:

docker pull mcr.microsoft.com/azure-sql-edge

2. Create Docker Network: Create a new Docker network with the following command:

docker network create my-network


3. Start Azure SQL Database: Start the Azure SQL database container using the following command:

docker run --cap-add SYS_PTRACE -e 'ACCEPT_EULA=1' -e 'MSSQL_SA_PASSWORD=Password.1' -p 1433:1433 --network my-network --name azuresqledge -d mcr.microsoft.com/azure-sql-edge

4. Navigate to Project Directory: Change the path of your terminal to the project directory.

5. Verify Dockerfile: Execute the ls command to verify the presence of the Dockerfile.

6. Execute Docker Compose: Execute the following command to run Docker Compose (for macOS):

docker compose up


7. Access Endpoint: Navigate to http://127.0.0.1:3000/ in your web browser.

8. Login Credentials: Use the following credentials to access the site:
Username: test1
Password: test1



// dbConfig.js

const config = {
    user: 'azureuser',
    password: 'Test@1234',
    server: 'qutation-project.database.windows.net',
    database: 'qutation-project',
    options: {
        encrypt: true // Use encryption
    }
};

module.exports = config;

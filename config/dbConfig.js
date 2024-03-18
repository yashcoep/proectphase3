

let config;

if (process.env.NODE_ENV === 'production') {
    // Azure Database configuration
    config = {
        user: 'azureuser',
        password: 'Test@1234',
        server: 'qutation-project.database.windows.net',
        database: 'qutation-project',
        options: {
            encrypt: true // Use encryption
        }
    };
} else {
    // Local Database configuration
    config = {
        user: 'sa',
        password: 'Password.1',
        server: 'azuresqledge',
        database: 'master',
        options: {
            encrypt: false,
            trustServerCertificate: true 
        }
    };
}

module.exports = config;

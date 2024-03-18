const sql = require('mssql');
const config = require('../config/dbConfig');
const crypto = require('crypto');

// Controller function to create a new user
exports.createUser = async (req, res) => {
    try {
        // Extract user data from request body
        const { username, password } = req.body;

        // Validate user data if necessary
        const hashedPassword = hashPassword(password);

        // Connect to the database
        await sql.connect(config);

        // SQL query to insert user data into the database
        await sql.query`INSERT INTO Users (Username, Password) VALUES (${username}, ${hashedPassword})`;

        // Close the database connection
        await sql.close();

        // Send a success response
        res.status(201).send({
            status: 201,
            message: 'User created successfully',
        });
    } catch (error) {
        // Handle database errors
        console.error('Error creating user:', error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error',
            error: error.message // Assuming `error` is the error object
        });
    } finally {
        // Close the database connection
        sql.close();
        console.log('Connection closed');
    }
};

function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

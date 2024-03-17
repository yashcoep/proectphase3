
const sql = require('mssql');
const config = require('../config/dbConfig'); // Import database configuration
const crypto = require('crypto');

const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};
// Function to authenticate a user
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Connect to the database
        await sql.connect(config);

        // Query to verify user credentials
         const result = await sql.query`SELECT Password FROM Users WHERE Username = ${username}`;

        if (result.recordset.length > 0) {
            // User found, compare hashed passwords
            const hashedPasswordDB = result.recordset[0].Password;
            const hashedPasswordInput = hashPassword(password);

            if (hashedPasswordDB === hashedPasswordInput) {
                // Passwords match, set session and redirect to catalog
                req.session.user = username;
                res.redirect('/catalog');
            } else {
                // Passwords don't match, redirect to login page
                 res.status(401).send('Incorrect username or password');
            }
        } else {
            // User not found, redirect to login page
            res.status(401).send('Incorrect username or password');
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).send('Internal Server Error' + error);
    } finally {
        // Close the database connection
        sql.close();
    }
};

// Middleware to check if user is logged in
exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
};

exports.logout = (req, res) => {
    // Clear the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        // Redirect to login page after logout
        res.redirect('/');
    });
};



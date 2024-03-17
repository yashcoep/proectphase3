// tests/login.test.js

// Import necessary modules
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Assuming your server file is named server.js

// Configure Chai
chai.use(chaiHttp);

// Describe the test suite for login functionality
describe('Login', () => {
    // Test case for successful login
    it('should login successfully with valid credentials', async () => {
        const res = await chai.request(app)
            .post('/login')
            .send({ username: 'validUsername', password: 'validPassword' });

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Login successful');
        expect(res.body).to.have.property('user');
    });

    // Test case for login with invalid credentials
    it('should return error for login with invalid credentials', async () => {
        const res = await chai.request(app)
            .post('/login')
            .send({ username: 'invalidUsername', password: 'invalidPassword' });

        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').equal('Invalid credentials');
    });

    // Add more test cases as needed
});

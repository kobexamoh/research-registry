// set up and imports
const request = require('supertest');
const app = require('../server');

// Test suite for the API endpoints.

// Test 1: GET professors returns data.
describe('GET /professors', () => {
    it('should return a list of professors in JSON format', async () => {
        const res = await request(app).get('/professors'); // make GET request to the /professors endpoint

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true); // confirm/check that the response body is an array (the list of professors)
        expect(res.body.length).toBeGreaterThan(0); // confirm/check that the array of professors is not empty
        expect()
    });
});

// Test 2: POST interest succeeds.


// Test 3: POST interest fails with missing fields.
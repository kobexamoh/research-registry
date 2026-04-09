// set up and imports
const request = require('supertest');
const app = require('../server');
const db = require('../db');

// Test suite for the API endpoints.

// Test 1: GET professors returns data.
describe('GET /professors', () => {
    it('should return a list of professors in JSON format', async () => {
        const res = await request(app).get('/professors'); // make GET request to the /professors endpoint

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true); // confirm/check that the response body is an array (the list of professors)
        expect(res.body.length).toBeGreaterThan(0); // confirm/check that the array of professors is not empty
    });
});

// Test 2: POST interest succeeds.
describe('POST /interest', () => {
    it('should create a new expression of interest and return the id of the new record in the database', async () => {
        const res = await request(app)
            .post('/interest')
            .send({
                student_name: 'Test Student',
                student_email: 'teststudent@example.com',
                professor_id: 1
            }); // make POST request to the /interest endpoint with the required fields in the request body

        expect(res.statusCode).toBe(201); // 201 status code indicates that server successfully processed the POST request (a request to create an expression of interest and the new resource (that is a new record) was added to the database.
        expect(res.body.message).toBe('Expression of interest was submitted successfully.'); // confirm/check that the response body contains a success message which indicates that the expression of interest was submitted successfully.
        expect(res.body.id).toBeDefined(); // confirm/check that the response body contains an id field - this indicates that the new record was sucessfully created in the database and that the id of the new record is being returned in the response body. 
    });
});

// Test 3: POST interest fails with missing fields.
describe('POST /interest with missing fields', () => {
    it('should return a 400 error when the required fields are missing', async () => {
        const res = await request(app)
            .post('/interest')
            .send({
                student_name: 'Test Student'
                // we don't include email and professor_id, the other required fields
            });

        expect(res.statusCode).toBe(400); // 400 status code means the server can't process the request due to client error (so in this case, the user didn't include all the required fields in the request body)
        expect(res.body.error).toBeDefined(); // confirms/checks that the response body contains an error field, which should contain a message indicating what the error is (in this case, that the required fields are missing from the request body)

        // TODO: a possible test for a 500 error if the DB fails?
    });
});

// Test 4: tests for search functionality using red, green, refactor.
    // Test 4.1: search returns matching professors.
describe('GET /professors?search=term', () => {
    const searchTerm = 'Science';
    it('should display all professors who have a field in the database matching the search term', async () => {
        const res = await request(app).get(`/professors?search=${searchTerm}`); // make a GET request to the endpoint with the query string being the searched term


        expect(res.statusCode).toBe(200); // request succeeds // TODO maybe put the status code into a variable that is declared once and used often so that this line isn't repeated across tests?
        expect(Array.isArray(res.body)).toBe(true); // confirm that response body is array // TODO also a repetition of earlier line so refactor this and line in other test
        expect(res.body.length).toBeGreaterThan(0); // I expect that the array of results is not empty

        // find searchTerm in response body
        const allMatch = res.body.every((professor) => {
          function professorContainsSearchTerm(profObject) {
            let deptCondition = profObject.department
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
            let nameCondition = profObject.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
            let researchAreaCondition = profObject.research_area
              .toLowerCase()
              .includes(searchTerm.toLowerCase());

            return deptCondition || nameCondition || researchAreaCondition; // return true if searchTerm found inside fields
          }
        });
        expect(allMatch).toBe(true);
    });
});

    // Test 4.2: search returns empty array if no matches found.

    // Test 4.3: search is case-insensitive.

    // Test 4.4: empty search query returns all professors.


// Close db connection after all tests so test suite doesn't hang.
afterAll(async () => {
    await db.end();
});
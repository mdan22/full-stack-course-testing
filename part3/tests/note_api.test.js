const { test, after } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')

// imports the express application from app.js
const app = require('../app')
// wraps the app with supertest function into a superagent object
const api = supertest(app)
// now tests can use the api var for making HTTP requests to the backend

// The async/await syntax is related to the fact that making a request
// to the API is an asynchronous operation.
test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    // The desired value is defined as a regex
    // which always starts and ends with a slash /
    // so we need to use a \/
    // also: regex is better practice here since
    // the header only needs to contain the string
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  // execution gets here only after the HTTP request is complete
  // the result of HTTP request is saved in variable response
  assert.strictEqual(response.body.length, 9)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  // create an array 'contents' with each content attribute of the notes
  const contents = response.body.map(e => e.content)

  // assert.strictEqual(contents.includes('HTML is easy'), true)
  // we can simplify this using assert itself:
  assert(contents.includes('HTML is easy'), true)
})

// after all the tests ran we close the DB connection using after
after(async () => {
  await mongoose.connection.close()
})

// Note: The tests only use the Express application defined in the app.js,
// which does not listen to any ports.
//
// the documentation for supertest says:
// "if the server is not already listening for connections
// then it is bound to an ephemeral port for you
// so there is no need to keep track of ports."

// benefit of using async: we can access the data returned from http requests more easily
// (no need to use callback functions and promises)

// the collection testNoteApp doesn't exist yet and thus the tests are failing
// but in the next subpart it will be handled

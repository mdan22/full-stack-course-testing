const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')

// imports the express application from app.js
const app = require('../app')
// wraps the app with supertest function into a superagent object
const api = supertest(app)
// now tests can use the api var for making HTTP requests to the backend

const helper = require('./test_helper')

const Note = require('../models/note')

const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially some notes saved', async () => {
  beforeEach(async () => {
    await Note.deleteMany({})
    // use insertMany instead of for of loop to make code simpler
    await Note.insertMany(helper.initialNotes)
  })

  // The async/await syntax is related to the fact that making a request
  // to the API is an asynchronous operation.
  test('notes are returned as json', async () => {
    console.log('entered test')
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

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    // execution gets here only after the HTTP request is complete
    // the result of HTTP request is saved in variable response
    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    // create an array 'contents' with each content attribute of the notes
    const contents = response.body.map(r => r.content)

    // assert.strictEqual(contents.includes('HTML is easy'), true)
    // we can simplify this using assert itself:
    assert(contents.includes('HTML is easy'))
  })

  describe('viewing a specific note', () => {

    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb()

      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with status code 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })

  })

  describe('addition of a new note', () => {

    // test adds a new note and verifies that the number of notes returned
    // by the API increases and that the newly added note is in the list
    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201) // content created
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    // test verifies that a note without content will not be saved to DB
    test('fails with status code 400 if data invalid', async () => {
      const newNote = {
        important: true
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

      const notesAtEnd = await helper.notesInDb()
      // using notesAtStart here (instead of helper.initialNotes) so the test dynamically adapts to the current state of the database
      assert.strictEqual(notesAtEnd.length, notesAtStart.length - 1)

      const contents = notesAtEnd.map(n => n.content)
      assert(!contents.includes(noteToDelete.content))
    })
  })
})



describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400) // bad request
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  // Could be implemented here:
  // We could also implement other validations into the user creation.
  // We could check that the username is long enough,
  // that the username only consists of permitted characters,
  // or that the password is strong enough.
  // Implementing these functionalities is left as an optional exercise.

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

// Note: test-driven development (TDD): tests for new functionality are written
// before the functionality is implemented

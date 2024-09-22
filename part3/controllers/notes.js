// notes.js defines the routes for the note list

const notesRouter = require('express').Router()
const Note = require('../models/note')

// we now use async and await...
// As all of the asynchronous operations are currently done inside of
// a function, it is enough to change the route handler functions
// into async functions

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  // response.json sends the notes array that was passed
  // to it as a JSON formatted string. Express
  // automatically sets the Content-Type header with the
  // appropriate value of application/json.
  response.json(notes)
})

// The async/await syntax that was introduced in ES7 makes it possible
// to use asynchronous functions that return a promise in a way that
// makes the code look synchronous.

// example1: fetching notes from DB with promises looks like this:
notesRouter.get('/example1', () => {
  // Note.find() returns a promise and we can access the result
  // of it by registering a callback function with .then
  Note.find({}).then(notes => {
    console.log('operation returned the following notes', notes)
  })
})

// If we wanted to make several asynchronous function calls
// in sequence, the situation would soon become painful:

// By chaining promises we could keep the situation somewhat under control:

// example2: using chaining promises to keep code with several async calls clean
notesRouter.get('/example2', () => {
  // Note.find() returns a promise and we can access the result
  // of it by registering a callback function with .then
  Note.find({})
    .then(notes => {
      return notes[0].deleteOne()
    })
    .then(() => {
      console.log('the first note is removed')
      // more code here
    })
})

// example3: using await to fetch all notes from DB:
// The code looks exactly like synchronous code.
notesRouter.get('/example3', async () => {
  const notes = await Note.find({}) // wait until the related promise is fulfilled

  console.log('operation returned the following notes', notes)
})

// example4: using await to implement example2
notesRouter.get('/example4', async () => {
  const notes = await Note.find({})
  const response = await notes[0].deleteOne()

  console.log('the first note is removed')
  response.json(response)
})

notesRouter.get('/:id', async (request, response) => {
  // using Mongoose's findById simplifies the code a lot
  const note = await Note.findById(request.params.id)
  if(note) {
    response.json(note)
  } else {
    response.status(404).end() // note 'not found'
  }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  // define the default value of important as false
  // use Note constructor function
  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false
  })

  // call save method which saves the object to the database
  // error handling with async/wait is done with try-catch (but it is handled by the express-async-errors middleware)
  const savedNote = await note.save()

  // json-parser turns this JSON data (note) into a JS object
  // and sends it back in the response
  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  // in both cases (id exists or not) we respond with the same code
  response.status(204).end() // 204 means "no content"
})

// updated the code to use async/await syntax and remove
// the try/catch bc express 5 handles it internally
notesRouter.put('/:id', async (request, response) => {
  // we simplified the note object
  const { content, important } = request.body

  // we need the {new: true} parameter so the modified version
  // of the note 'updatedNote' is given to the event handler
  const savedNote = await Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    // added runValidators: true, context: 'query'
    // so the validation works for PUT route
    { new: true, runValidators: true, context: 'query' }
  )
  response.json(savedNote)
})

module.exports = notesRouter

// important: envs need to be available globally before
// the code from other modules is imported.
require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')

// use static to make Express show static content, the
// page index.html and the JavaScript, etc. which it fetches
app.use(express.static('dist'))

// use cors to allow for requests from all origins
app.use(cors())

// use the middleware 'json-parser' from the express package
app.use(express.json())

// Middleware  are functions that can be used for handling request and response objects.

// we make our own middleware that logs method path and body for each request object
// middleware functions are called in the order that they're encountered by the JavaScript
// so we make sure our requestLogger gets called after the json-parser
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
  // Express automatically sets the value of the
  // Content-Type header to be text/html. The status
  // code of the response defaults to 200.
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    // response.json sends the notes array that was passed
    // to it as a JSON formatted string. Express
    // automatically sets the Content-Type header with the
    // appropriate value of application/json.
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  // using Mongoose's findById simplifies the code a lot
  // (error handling comes later)
  Note.findById(request.params.id)
    .then(note => {
      if(note) {
        response.json(note)
      } else {
        response.json(404).end() // note 'not found'
      }
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then( () => {
      // in both cases (id exists or not) we respond with the same code
      response.status(204).end() // 204 means "no content"
    }).catch(error => next(error)) // next passes exceptions to the error handler
})

// the array created by map() gets transformed into
// individual numbers by using the "three dot" spread syntax ...
// generateId() function no longer necessary

app.post('/api/notes', (request, response, next) => {
  const body = request.body
  console.log(body)

  // make sure notes can't be added if body content is empty
  if(body.content === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  // define the default value of important as false
  // use Note constructor function
  const note = new Note({
    // why do we remove the id?
    // id: generateId(),
    content: body.content,
    important: Boolean(body.important) || false
  })

  // call save method which saves the object to the database
  // and close the connection to end the execution of this code
  note.save()
    .then(
      savedNote => {
      // json-parser turns this JSON data (note) into a JS object
      // and sends it back in the response
        response.json(savedNote)
      }
    )
    .catch(error => next(error))

  // for some reason we don't need mongoose.connection.close()
  // when saving a note...
})

app.put('/api/notes/:id', (request, response, next) => {
  // we simplified the note object
  const { content, important } = request.body

  // we need the {new: true} parameter so the modified version
  // of the note 'updatedNote' is given to the event handler
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    // added runValidators: true, context: 'query'
    // so the validation works for PUT route
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

// URL	verb	functionality
// notes/10	GET	fetches a single resource
// notes	GET	fetches all resources in the collection
// notes	POST	creates a new resource based on the request data
// notes/10	DELETE	removes the identified resource
// notes/10	PUT	replaces the entire identified resource with the request data
// notes/10	PATCH	replaces a part of the identified resource with the request data

// For backend testing of http verb operations there are plenty of tools to choose from:
// - curl
// - Postman
// - The Visual Studio Code REST client
// - The WebStorm HTTP Client

// The HTTP standard talks about two properties related to
// request types: safety and idempotency

// GET and HEAD methods are considered "safe" since they
// do not cause any side effects on the server

// GET, HEAD, PUT and DELETE are idempotent which means:
// (aside from error or expiration issues) the side-effects
// of N > 0 identical requests is the same as for a single request.

// POST is the only HTTP request type that is neither safe nor idempotent.

// Safety and idempotency are just a recommendation in the HTTP standard
// and not something that can be guaranteed simply based on the request type.

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// It's also important that the middleware for handling unsupported
// routes (unknown endpoint) is next to the last middleware
// (here: app.post(...)) that is loaded into Express,
// just before the error handler.

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if(error.name === 'CastError') {
    return response.status(400).send({ error:'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message }) // why do we use .json here?
  }

  next(error)
}

// this has to be the last loaded middleware,
// also all the routes should be registered before this!

// handler of requests that result in errors
app.use(errorHandler)

// now we always use the port defined in the environment variable PORT

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

// I also fixed all the warnings from ESLint

// It's important that dotenv gets imported before
// the note model is imported. This ensures that
// the environment variables from the .env file are
// available globally before the code from the other
// modules is imported.
require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

// the Note variable is assigned to the
// same object that the module defines
const Note = require('./models/note')

app.use(express.static('dist'))
app.use(cors())
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

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
      },
      {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
      },
      {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
      }
]

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

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id) // fix: changed id from string to number:
  const note = notes.find(note => note.id === id)
  if(note) { // if note is not undefined
    response.json(note)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

// the array created by map() gets transformed into
// individual numbers by using the "three dot" spread syntax ...
const generateId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => Number(n.id)))
  : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body
  console.log(body)

  // make sure notes can't be added if body content is empty
  if(!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  // define the default value of important as false
  const note = {
    id: generateId(),
    content: body.content,
    important: Boolean(body.important) || false
  }
  
  notes = notes.concat(note)

  response.json(note)
  // json-parser turns this JSON data (note) into a JS object
  // and sends it back in the response
})

// now we always use the port defined in the environment variable PORT

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

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
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

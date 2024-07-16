const express = require('express')
const app = express()

app.use(express.json())

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
    response.json(notes)
    // response.json sends the notes array that was passed
    // to it as a JSON formatted string. Express
    // automatically sets the Content-Type header with the
    // appropriate value of application/json.
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

const PORT = 3001
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

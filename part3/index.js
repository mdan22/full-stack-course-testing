const express = require('express')
const app = express()

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

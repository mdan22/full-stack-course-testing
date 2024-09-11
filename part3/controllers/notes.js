const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    // response.json sends the notes array that was passed
    // to it as a JSON formatted string. Express
    // automatically sets the Content-Type header with the
    // appropriate value of application/json.
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response, next) => {
  // using Mongoose's findById simplifies the code a lot
  // (error handling comes later)
  Note.findById(request.params.id)
    .then( note => {
      if(note) {
        response.json(note)
      } else {
        response.json(404).end() // note 'not found'
      }
    })
    .catch(error => next(error))
})

notesRouter.post('/', (request, response, next) => {
  const body = request.body

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

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      // in both cases (id exists or not) we respond with the same code
      response.status(204).end() // 204 means "no content"
    })
    .catch(error => next(error)) // next passes exceptions to the error handler
})

notesRouter.put('/:id', (request, response, next) => {
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

module.exports = notesRouter

// app.js creates the actual application
// and takes the router into use
// it also is responsible of establishing the connection to MongoDB

const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')

const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to MongoDB')

// logs a message to the console about the
// success status when trying to connect
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// use cors to allow for requests from all origins
app.use(cors())

// use static to make Express show static content, the
// page index.html and the JavaScript, etc. which it fetches
app.use(express.static('dist'))

// use the middleware 'json-parser' from the express package
app.use(express.json())

// Middleware  are functions that can be used for handling request and response objects.
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

// the middleware for handling unsupported
// routes (unknown endpoint) is next to the last middleware
// (here: notesRouter) that is loaded into Express,
// just before the error handler.
app.use(middleware.unknownEndpoint)

// this has to be the last loaded middleware,
// also all the routes should be registered before this!
app.use(middleware.errorHandler)

module.exports = app

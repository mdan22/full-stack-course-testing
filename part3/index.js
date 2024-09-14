// index.js is the entry point of the app
// it imports the app module and starts the server

const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

// now we always use the port defined in the environment variable PORT
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

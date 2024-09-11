// important: envs (-> config) need to be available globally before
// the code from other modules is imported.

const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

// now we always use the port defined in the environment variable PORT
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

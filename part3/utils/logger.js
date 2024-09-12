const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

const logger = {
  info, error
}

// exporting the object as a named variable makes
// finding all references in vscode possible
module.exports = logger

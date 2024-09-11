const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  // The content field is now required to be at least
  // five characters long and it is set as required,
  // meaning that it can not be missing.
  content: {
    type: String,
    required: true,
    minLength: 5
  },
  important: Boolean,
})

// this method transforms the _id property (which is actually an object)
// into a string just to be safe and to prevent issues in the future
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)

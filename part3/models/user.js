// contains the mongoose schema for users
// and sets the toJSON method for the schema?

// we decide to store the ids of the notes created by
// the user in the user document

// the user has an array of references to all of the notes created by them

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String, // is saved internally ig but not visible once it is fetched -> toJSON
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId, // the ids of the notes are stored here
      ref: 'Note' // the syntax 'Note' is purely related to and defined by Mongoose
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User

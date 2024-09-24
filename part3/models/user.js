// contains the mongoose schema for users
// and sets the toJSON method for the schema?

// we decide to store the ids of the notes created by
// the user in the user document

// the user has an array of references to all of the notes created by them

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // this ensures the uniqueness of username
    // If there are already documents in the database that
    // violate the uniqueness condition, no index will be created
    unique: true,
    // make sure username is long enough (for optional exercise)
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot be longer than 30 characters'], // 30 charas might be too long
    // make sure username only consists of permitted characters (for optional exercise)
    validator: {
      // this is a custom validator
      validate: (value) => {
        return /^[a-zA-Z0-9_]*$/.test(value)
      },
      message: (props) => `${props.value} is not a valid username. Only letters, numbers, and underscores can be used.`
    }
  },
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

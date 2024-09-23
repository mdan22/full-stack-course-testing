const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

// can be used for creating a database object ID that
// does not belong to any note objec in DB
const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toJSON()
}

// can be used for checking the notes stored in DB
const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find()
  return users.map(user => user.toJSON())
}

const test_helper = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb
}

module.exports = test_helper

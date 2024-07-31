const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

// we can pass database user password with the command
// node mongo.js yourPassword
const password = process.argv[2]

const url =
  `mongodb+srv://mdan22:${password}@cluster0.x1k0o1c.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

// establish the connection to the database
mongoose.connect(url)

// define the schema for a note and the matching model
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// create a new note object with the help of the Note model
const note = new Note({
  content: 'Mongoose makes things easy',
  important: true,
})

// define save method which becomes usable for all objects of the database
// save() saves the object to the database
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

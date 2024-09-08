const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

// we log the url as DB address instead of hardcoding it
console.log('connecting to ', url)

// logs a message to the console about the
// success status when trying to connect
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const noteSchema = new mongoose.Schema({
    // The content field is now required to be at least
    // five characters long and it is set as required,
    // meaning that it can not be missing.
    content: {
        type: String,
        minLength: 5,
        required: true
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

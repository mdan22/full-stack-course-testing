// not sure if I'll need this in the future it's mostly for taking notes for the course...

// Since users can have many notes, the related ids
// are stored in an array in the notes field
const initialUsers = [
  {
    username: 'mluukkai',
    _id: 123456,
    notes: [221212, 221255]
  },
  {
    username: 'hellas',
    _id: 141414,
    notes: [221244]
  },
]

// In this schema, notes would be tightly nested under users
// and the database would not generate ids for them.
const altUsers = [
  {
    username: 'mluukkai',
    _id: 123456,
    notes: [
      {
        content: 'HTML is easy',
        important: false,
      },
      {
        content: 'The most important operations of HTTP protocol are GET and POST',
        important: true,
      },
    ],
  },
  {
    username: 'hellas',
    _id: 141414,
    notes: [
      {
        content:
          'A proper dinosaur codes with Java',
        important: false,
      },
    ],
  },
]

const usersCollection = {
  initialUsers, altUsers
}

module.exports = usersCollection

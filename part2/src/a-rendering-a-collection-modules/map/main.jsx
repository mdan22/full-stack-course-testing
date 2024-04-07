import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

const result = notes.map(note => note.id)
console.log(result) // prints [1, 2, 3]

// map always creates a new array, the elements
// of which have been created from the elements
// of the original array by mapping: using the
// function given as a parameter to the map method.
// the (callback) function is: note => note.id

// the full form would be:
// (note) => {
//   return note.id
// }

// The function gets a note object as a parameter and returns the value of its id field.

const result2 = notes.map(note => note.content)
console.log(result2);
// this results in an array containing the contents of the notes.

// This is already pretty close to the React code we used:

// notes.map(note =>
//   <li key={note.id}>
//     {note.content}
//   </li>
// )

// which generates a li tag containing the contents of the note from each note object.
// Because the function parameter passed to the map method -

// note => <li key={note.id}>{note.content}</li>

// - is used to create view elements, the value of the variable must be rendered
// inside curly braces. Try to see what happens if the braces are removed.


ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)

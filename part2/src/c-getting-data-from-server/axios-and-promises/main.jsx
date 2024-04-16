import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'

// const promise = axios.get('http://localhost:3001/notes')
// console.log(promise)

// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)

// "A Promise is an object representing the eventual
// completion or failure of an asynchronous operation."

// tldr: a promise is an object that represents an asynchronous operation

// a promise can have 3 distinct states:

// The promise is pending:    the final value is not available yet.
// The promise is fulfilled:  the operation has been completed.
// The promise is rejected:   the operation has failed.

// const promise = axios.get('http://localhost:3001/notes')
// promise.then(response => {
//   const notes = response.data
//   console.log(notes)
// })

// lets make it shorter using a chained method call:

// The callback function now takes the data contained within the
// response, stores it in a variable, and prints the notes to the
// console.

axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
    ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes}/>)
  })

// requests the notes from our local server and renders them

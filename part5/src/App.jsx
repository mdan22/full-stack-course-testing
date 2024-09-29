import { useState, useEffect } from "react"
import Note from "./components/Note"
import Notification from "./components/Notification"
import Footer from "./components/Footer"
import noteService from "./services/notes"
import loginService from "./services/login"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('') // newNote state reflects the current value of the input
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null) // set initial value to null
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // we use noteService.getAll() instead of axios.get(...)
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  useEffect(() =>{
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  // The empty array as the parameter of the effect ensures that the effect
  // is executed only when the component is rendered for the first time.

  // Now a user stays logged in to the application forever.
  // We should probably add a logout functionality,
  // which removes the login details from the local storage.
  // We will however leave it as an optional exercise.

  // You can log out with the command:
  // window.localStorage.removeItem('loggedNoteappUser')

  // or with the command which empties localstorage completely:
  // window.localStorage.clear()

  console.log('render', notes.length, 'notes')

  // we use noteService.create(...) instead of axios.post(...)
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
      // I let the ids still be generated here bc it doesnt work properly otherwise
    }
    noteService.create(noteObject)
      .then(returnedNotes => {
        setNotes(notes.concat(returnedNotes))
        setNewNote('') 
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} is being toggled`) // template string syntax
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important} // object spread syntax
    noteService.update(id, changedNote)
      .then(returnedNotes => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNotes))
    })
    .catch( () => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      // filter returns a new array comprising only the items from the
      // list for which the function "n.id !== id" returns true for
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      // the details of a logged-in user are now saved to the local storage
      // and can be viewed in the browser console by typing window.localStorage
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      // call the setToken method to set the token
      // of noteService to the current user's token
      noteService.setToken(user.token)
      // set user state to the logged in user
      setUser(user)
      // reset username + password fields
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // outsource the loginForm to a separate component
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  // outsource the noteForm to a separate component
  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h1>Notes</h1>
      
      <Notification message={errorMessage} />

      {/* We display the login form only if the user is not logged in */}      
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      }

      <h2>Notes</h2>
      
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
      )}
      </ul>

      <Footer />
    </div>
  )
}

// We have added the addNote function as
// an event handler to the form element
// that will be called when the form is
// submitted, by clicking the submit
// button.

export default App

// Frontend production build (3b):

// A production build for applications created with Vite can be created
// with npm run build.
// This creates a directory called dist which contains the only HTML file
// of our application (index.html) and the directory assets.
// Minified version of our application's JavaScript code will be
// generated in the dist directory.


// Login in frontend (5a):

// Our main component App is at the moment way too large. The changes we
// did now are a clear sign that the forms should be refactored into their
// own components. However, we will leave that for an optional exercise.


// A note on using local storage (5a):

// Saving a token in the local storage might contain a security risk
// if the application has a security vulnerability that allows
// Cross Site Scripting (XSS) attacks.

// An XSS attack is possible if the application would allow a user to inject
// arbitrary JavaScript code (e.g. using a form) that the app would then execute.

// When using React sensibly it should not be possible since React sanitizes
// all text that it renders, meaning that it is not executing the rendered content
// as JavaScript.

// If one wants to play safe, the best option is to not store a token in
// local storage.
// This might be an option in situations where leaking a token might have
// tragic consequences.

// It has been suggested that the identity of a signed-in user should be saved
// as httpOnly cookies, so that JavaScript code could not have any access to the token.

// The drawback of this solution is that it would make implementing SPA applications
// a bit more complex.

// One would need at least to implement a separate page for logging in.

// However, it is good to notice that even the use of httpOnly cookies
// does not guarantee anything.

// It has even been suggested that httpOnly cookies are not any safer
// than the use of local storage.

// So no matter the used solution the most important thing is to minimize
// the risk of XSS attacks altogether.

import { useState, useEffect } from "react"
import Note from "./components/Note"
import Notification from "./components/Notification"
import Footer from "./components/Footer"
import noteService from "./services/notes"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import NoteForm from "./NoteForm"

const App = () => {
  const [notes, setNotes] = useState([])
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
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
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
  // We will however leave it as an optional exercise. I did that.

  // You can log out with the command:
  // window.localStorage.removeItem('loggedNoteAppUser')

  // or with the command which empties localstorage completely:
  // window.localStorage.clear()

  console.log('render', notes.length, 'notes')

  // we use noteService.create(...) instead of axios.post(...)
  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
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
        'loggedNoteAppUser', JSON.stringify(user)
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
const loginForm = () => {
    return (
      // LoginForm is now a child component of Togglable
      <Togglable buttonLabel='login' >
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  // outsource logout form
  // added it for convenience
  // simple - it's just a logout button
  const logoutForm = () => (
    <button onClick={handleLogout}>logout</button>
  )

  // logout event handler
  // handler sets user and token to null and
  // removes local storage data of user in browser
  const handleLogout = async (event) => {
    event.preventDefault()
    
    window.localStorage.removeItem('loggedNoteAppUser')

    noteService.setToken(null)
    setUser(null)
  }

  return (
    <div>
      <h1>Notes</h1>
      
      <Notification message={errorMessage} />

      {/* render login or (logout + note form) conditionally */}      
      {user === null
        ? loginForm()
        : <div>
            <p>{user.name} logged-in{logoutForm()}</p>
            <Togglable buttonLabel={'new Note'}>
              <NoteForm createNote={addNote}/>
            </Togglable>
          </div>
      }
      
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

export default App
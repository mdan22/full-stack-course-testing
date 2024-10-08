import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null) // set initial value to null
  const [user, setUser] = useState(null)

  // we use noteService.getAll() instead of axios.get(...)
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
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
    // call fct from Toggle component to toggle visibility of NoteForm
    noteFormRef.current.toggleVisibility()

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
    const changedNote = { ...note, important: !note.important } // object spread syntax
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

  // handler for login
  // replaced event with username, password
  // so it works with extracted loginForm
  // we leave handleLogin in App.jsx since handleLogin
  // needs to access the errormessage and user state
  const handleLogin = async (username, password) => {
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
      // username + password fields are reset in LoginForm component
      return true // login successful
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return false // login failed
    }
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

  // define a ref for noteForm and use it in the HTML to be rendered
  // we could even define other ref that uses the useImperativeHandle hook
  // to hide things in specific situations
  // there are also other use cases for refs than accessing React components:
  // https://react.dev/learn/manipulating-the-dom-with-refs
  const noteFormRef = useRef()
  const noteForm = () => (
    <Togglable buttonLabel={'new Note'} ref={noteFormRef}>
      <NoteForm createNote={addNote}/>
    </Togglable>
  )

  const togglable1 = useRef()
  const togglable2 = useRef()
  const togglable3 = useRef()

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {/*
        The app works but a button is rendered that has no label text.
        Expected and required props of a component can be defined with the prop types packeage.
      */}

      {/* <Togglable > buttonLabel forgotten... </Togglable> */}
      {/* <Togglable buttonLabel={'buttonLabel not forgotten'} > This is hidden lol </Togglable> */}

      {/* render login or (logout + note form) conditionally */}
      {user === null
        ? <div>
          <Togglable buttonLabel={'login'}>
            {/* handleLogin function is passed to the component */}
            <LoginForm handleSubmit={handleLogin}/>
          </Togglable>
        </div>
        : <div>
          <p>{user.name} logged-in{logoutForm()}</p>
          {noteForm()}
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

      {/* WILL REMOVE THIS SOON LOL */}
      <div>
        We create three separate instances of the component
        that all have their separate state:

        <Togglable buttonLabel="1" ref={togglable1}>
          {/* We can put a handler here
          which can access the toggle component
          through the togglable1 reference */}
          first
        </Togglable>

        <Togglable buttonLabel="2" ref={togglable2}>
          second
        </Togglable>

        <Togglable buttonLabel="3" ref={togglable3}>
          third
        </Togglable>

        The ref attribute is used for assigning a reference
        to each of the components in the variables
        togglable1, togglable2 and togglable3.
      </div>

      <Footer />
    </div>
  )
}


export default App
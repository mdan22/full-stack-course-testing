import { useState, useEffect } from "react"
import Note from "./components/Note"
import Notification from "./components/Notification"
import Footer from "./components/Footer"
import noteService from "../../services/notes"

const App = () => {
  // This is a pretty natural initial value since the notes are a set
  // const [notes, setNotes] = useState([])

  // If the state would be only saving "one thing", a more proper initial value would be null
  const [notes, setNotes] = useState(null)



  const [newNote, setNewNote] = useState('') // newNote state reflects the current value of the input
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  // we use noteService.getAll() instead of axios.get(...)
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  },[])
  // the second parameter is used to specify how often the effect is run
  // the principle: the effect is always executed after the first render of
  // the component and when the value of the second parameter changes.

  // If the second parameter is an empty array [], its content never
  // changes and the effect is only run after the first render of the
  // component. This is exactly what we want when we are initializing the
  // app state from the server.

  // However, there are situations where we want to perform the effect at
  // other times, e.g. when the state of the component changes in a
  // particular way.

  

  // do not render anything if notes is still null
  if (!notes) {
    return null
  }

  // console.log('render', notes.length, 'notes')

  // we use noteService.create(...) instead of axios.post(...)
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: notes.length + 1,
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
    .catch(error => {
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

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
        <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
      )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
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

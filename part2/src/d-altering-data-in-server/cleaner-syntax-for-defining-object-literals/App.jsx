import { useState, useEffect } from "react"
import Note from "./components/Note"
import noteService from "../../services/notes"

const App = () => {
  const [notes, setNotes] = useState([])
  // the newNote state reflects the current value of the input
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // we use noteService.getAll instead of axios.get(...)
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  console.log('render', notes.length, 'notes')

  // we use noteService.create instead of axios.post(...)
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

  // we use noteService.update instead of axios.put(...)
  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} is being toggled`) // template string syntax
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important} // object spread syntax
    // we create an extra copy (shallow copy) of note bc
    // we must never mutate state directly in React.
    noteService.update(id, changedNote)
      .then(returnedNotes => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNotes))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      {/* add functionality that enables users */}
      {/* to toggle the showAll state from ui*/}
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
    </div>
  )
}

// We have added the addNote function as
// an event handler to the form element
// that will be called when the form is
// submitted, by clicking the submit
// button.

export default App

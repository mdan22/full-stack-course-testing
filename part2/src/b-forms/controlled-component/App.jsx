import { useState } from "react"
import Note from "./components/Note"

// How do we access the data contained in the
// form's input element?

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(
    'a new note...'
  )

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target);

    // the newNote state reflects the current value
    // of the input, which means that we can
    // complete the addNote function for creating
    // new notes:

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    // The new note is added to the list of notes
    // using the concat array method:

    setNotes(notes.concat(noteObject))
    // resets the value of controled input element:
    setNewNote('') 
  }

  // Since we assigned a piece of the App
  // component's state as the value attribute of
  // the input element, the App component now
  // controls the behavior of the input element.

  // To enable editing of the input element, we
  // have to register an event handler that
  // synchronizes the changes made to the input
  // with the component's state:

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
        <Note key={note.id} note={note}/>
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

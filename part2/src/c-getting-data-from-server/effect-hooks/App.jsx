import { useState, useEffect } from "react"
import axios from "axios"
import Note from "./components/Note"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect');
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled');
        setNotes(response.data);
      })
  }
  
  useEffect((hook), [])

  // useEffect takes two parameters:
  // 1) a function - the effect itself
  // 2) an empty array - meaning the effect is
  // only run along the 1st render of the component

  // (There are many possible use cases for
  // an effect hook other than fetching
  // data from the server.) 

  console.log('render', notes.length, 'notes')

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

  // Filtering is done with the help of the array
  // filter method:
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
    // operator '=== true' is redundant here

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
          <Note key={note.id} note={note} />
        )}
      </ul>
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

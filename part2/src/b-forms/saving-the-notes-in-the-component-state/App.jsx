import { useState } from "react"
import Note from "./components/Note"

// starting with an empty list be like:
// const App = () => { 
//   const [notes, setNotes] = useState([]) 

//   // ...
// }  

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  const addNote = (event) => {
    event.preventDefault()
    // prevents the default action of submitting a form.
    // The default action would, among other things,
    // cause the page to reload.
    console.log('button clicked', event.target);
    // The target of the event stored in event.target
    // is logged to the console.
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
        <input />
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

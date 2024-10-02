import { useState } from "react"

const NoteForm = ({createNote}) => {
  // we moved the state related to the new note to the component
  const [newNote, setNewNote] = useState('') // newNote state reflects the current value of the input
  
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target);
    createNote({
      content: newNote,
      important: true, // this was changed to always be true
    })
  }

  return (
    <div>  
    <h2>Create a new note</h2>

    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={event => {
            setNewNote(event.target.value)
            console.log(event.target.value)
          }
        }
      />
      <button type="submit">save</button>
    </form>
    </div>
  )
}

export default NoteForm
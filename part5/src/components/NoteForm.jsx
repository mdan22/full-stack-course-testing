import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  // we moved the state related to the new note to the component
  const [newNote, setNewNote] = useState('') // newNote state reflects the current value of the input

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  // addNote handler is called when form is submited.
  // once it is called, we call the createNote handler
  // that was received as prop with the newNote state
  // as content, which makes the http request to server.
  const addNote = (event) => {
    event.preventDefault()

    console.log('button clicked', event.target)

    createNote({
      content: newNote,
      important: true, // this was changed to always be true (initially)
    })
    // resetting the note field is probably needed here?
    setNewNote('')
  }

  return (
    // add className 'formDiv' to find Component when testing
    <div className='formDiv'>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleChange}
          placeholder='write note content here'
          id='note-input'
        />
        {/* <input
          value={'...'}
          onChange={() => {
            console.log('test')
          }}
        /> */}
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
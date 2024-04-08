import Note from "./components/Note"

// Note that the key attribute must now be defined for the Note
// components, and not for the li tags like before.

// const Note = ({note}) => {
//   return (
//     <li>{note.content}</li>
//   )
// }

// we can put notes directly as parameter for app instead of props
const App = ({notes}) => {
  // const { notes } = props
  
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
        <Note key={note.id} note={note}/>
      )}
      </ul>
    </div>
  )
}

export default App

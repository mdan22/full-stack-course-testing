const Note = ({note, toggleImportance}) => {
  const label = note.important
    ? 'make not important' : 'make important'
    
  return (
    // in React we need to use className instead of class
    <li className="note">
      {note.content} <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
  
// The last line of the module exports the declared module,
// the variable Note.

export default Note
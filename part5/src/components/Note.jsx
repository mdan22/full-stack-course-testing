const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    // in React we need to use className instead of class
    // by using the className attribute,
    // the component can be accessed in tests
    <li data-testid='42' className='note'>
      {note.content} <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

// The last line of the module exports the declared module,
// the variable Note.

export default Note
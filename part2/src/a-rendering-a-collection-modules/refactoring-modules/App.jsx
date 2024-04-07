const App = (props) => {
  const { notes } = props

  // We could have made the error message on our
  // console disappear by using the array indexes
  // as keys. The indexes can be retrieved by
  // passing a second parameter to the callback
  // function of the map method:
  
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note, i) =>
        <li key={i}>
          {note.content}
        </li>
      )}
      </ul>
    </div>
  )
}

// This is, however, not recommended and can
// create undesired problems even if it seems
// to be working just fine.

export default App

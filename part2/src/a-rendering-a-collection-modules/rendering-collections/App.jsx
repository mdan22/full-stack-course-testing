const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/* This would work but referring to hard coded index numbers is a bad practice:
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
        instead we can use map to auto-generate React elements from the array objects: */}
        {notes.map(note => {
        <li>
          {notes.content}
        </li>
      })}
      </ul>
    </div>
  )
}

// Because the code generating the li tags is JavaScript,
// it must be wrapped in curly braces in a JSX template
// just like all other JavaScript code.

export default App

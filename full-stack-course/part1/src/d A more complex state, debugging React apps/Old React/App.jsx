import { useState } from "react"

  const App = () => {
  
    return (
      <div>
        <h1>Old React</h1>
        <p>In this course, we use the state hook to add state to our
          React components, which is part of the newer versions of
          React and is available from version 16.8.0 onwards. Before
          the addition of hooks, there was no way to add state to
          functional components. Components that required state had
          to be defined as class components, using the JavaScript
          class syntax.</p>
        <p>Even though functional components are the future of React,
          it is still important to learn the class syntax, as there
          are billions of lines of legacy React code that you might
          end up maintaining someday. The same applies to documentation
          and examples of React that you may stumble across on the
          internet.</p>
<p><strong>Note:</strong> React class components will be covered later in the course</p>
      </div>
    )
  }

export default App

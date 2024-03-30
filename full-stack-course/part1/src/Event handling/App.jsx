import { useState } from "react"

const App = () => {
    const [counter, setCounter] = useState(0)

    // const handleClick = () => {
    //   console.log('clicked')
    // }

    return (
      <div>
        <div>{counter}</div>
        <button onClick={() => {setCounter(counter+1); console.log('clicked',counter)}}>
          plus
        </button>
        <button onClick={() => {setCounter(0); console.log('reset', counter)}}>
          zero
          </button>
      </div>
    )
  }
  
  export default App
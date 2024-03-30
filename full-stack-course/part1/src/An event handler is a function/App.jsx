import { useState } from "react"

const App = () => {
    const [counter, setCounter] = useState(0)

    const increaseByOne = () => {
      setCounter(counter+1)
      console.log('clicked',counter)
    }

    const setToZero = () => {
      setCounter(0)
      console.log('reset', counter)
    }

    return (
      <div>
        <div>{counter}</div>
        {/* The event handler is a function or a function reference, not a function call.
          That's why this leads to errors, namely to infinite loop */}
         {/* <button onClick={setCounter(counter+1), console.log('clicked',counter)}>
          plus
        </button> */}
        <button onClick = {increaseByOne}>
          plus
        </button>
        <button onClick={setToZero}>
          zero
          </button>
      </div>
    )
  }
  
  export default App
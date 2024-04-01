import { useState } from "react"

  const App = () => {
    const [value, setValue] = useState(10)
    
    // old syntax:
    // const hello = (who) => {
    //   const handler = () => {
    //     console.log('hello', who)
    //   }
    //   return handler
    // }

    // simplified syntax w/o helper variables:
    // const hello = (who) => {
    //   return () => {
    //     console.log('hello', who)
    //   }
    // }

    // can be simplified even further:
    // const hello = (who) => () => {
    //   console.log('hello', who)
    // }

    // const setToValue = (newValue) => () => {
    //   console.log('value now', newValue) // print the new value to console
    //   setValue(newValue)
    // }

    const setToValue = (newValue) => {
      console.log('value now', newValue) // print the new value to console
      setValue(newValue)
    }    

    return (
      <div>
        {value}
        {/* This only works when using the braces ():
        <button onClick={hello()}>button</button>
        <button onClick={hello('world')}>button</button>
        <button onClick={hello('react')}>button</button>
        <button onClick={hello('function')}>button</button>
        */}
        <button onClick={() => setToValue(1000)}>thousand</button>
        <button onClick={() => setToValue(0)}>reset</button>
        <button onClick={() => setToValue(value +1)}>increment</button>
      </div>
    )
  }

export default App

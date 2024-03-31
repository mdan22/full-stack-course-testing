import { useState } from "react"

// One best practice in React is to lift the state up in the component hierarchy.
// this means placing the application's state in the App component and passing it down to the Display component through props:
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
    const [counter, setCounter] = useState(0)

    const increaseByOne = () => {
      setCounter(counter+1)
      console.log('incrementing...',counter)
    }

    const setToZero = () => {
      setCounter(0)
      console.log('reseting...', counter)
    }

    const decreaseByOne = () => {
      setCounter(counter-1)
      console.log('decrementing...')
    }

    return (
      <div>
        <Display counter={counter} />
        <Button
          onClick = {increaseByOne}
          text = 'plus'
        />
        <Button
          onClick={setToZero}
          text='zero'
        />
        <Button
        onClick={decreaseByOne}
        text= 'minus'
        />
      </div>
    )
  }
  
  // "In React, it’s conventional to use onSomething names for props
  // which take functions which handle events and handleSomething for
  // the actual function definitions which handle those events."

  export default App
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
    console.log('rendering with counter value', counter)

    const increaseByOne = () => {
      console.log('incrementing value before', counter)
      setCounter(counter+1)
    }

    const setToZero = () => {
      console.log('resetting value before', counter)
      setCounter(0)
    }

    const decreaseByOne = () => {
      console.log('decrementing value before', counter)
      setCounter(counter-1)
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
  
  export default App
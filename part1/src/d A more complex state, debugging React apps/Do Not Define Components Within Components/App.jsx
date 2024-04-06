import { useState } from "react"

// the Display component function is now at its correct place,
// which is outside of the App component function:
const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue) // print the new value to console
    setValue(newValue)
  }

  // The application still appears to work, but
  // do not define components inside another component
  // const Display = props => <div>{props.value}</div>
  // The biggest problems are because React treats a
  // component defined inside of another component as
  // a new component in every render. This makes it
  // impossible for React to optimize the component.

  return (
    <div>
      {value}
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value +1)} text="increment" />
    </div>
  )
}

export default App

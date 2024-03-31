import { useState } from "react"

// old syntax:
// const Display = (props) => {
//   return (
//     <div>{props.counter}</div>
//   )
// }

// simplified syntax using destructuring:
// const Display = ({counter}) => {
//   return (
//     <div>{counter}</div>
//   )
// }

// this can be simplified further to:
const Display = ({counter}) => <div>{counter}</div>

// old syntax:
// const Button = (props) => {
//   return (
//     <button onClick={props.onClick}>
//       {props.text}
//     </button>
//   )
// }

// simplified syntax using destructuring:
// const Button = ({onClick, text}) => {
//   return (
//     <button onClick={onClick}>
//       {text}
//     </button>
//   )
// }

// this can be simplified further to:
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

// By convention, event handler props should start with on, followed by a
// capital letter. For example, the Button component’s 'onClick' prop could
// have been called 'onSmash'

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
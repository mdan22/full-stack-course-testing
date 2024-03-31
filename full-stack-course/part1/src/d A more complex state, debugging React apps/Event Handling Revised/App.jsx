import { useState } from "react"

  // const Button = (props) => {
  //   console.log('props value is', props)
  //   const {handleClick, text} = props
  //   return(
  //     <button onClick={handleClick}>
  //       {text}
  //     </button>
  //   )
  // }

  // Event handlers must always be a function
  // or a reference to a function. The button
  // will not work if the event handler is set
  // to a variable of any other type.

  const App = () => {
    const [value, setValue] = useState(10)
    
    const handleClick = () => {
      console.log('clicked the button')
      setValue(0)
    }

    return (
      <div>
        {value}
        {/* If we were to define the event handler as a string,
        React would throw a warning in the console:
        <button onClick="crap...">button</button>
        This also wouldn't work:
        <button onClick={value + 1}>button</button>
        This doesn't throw any warnings. But nothing happens when button gets clicked:
        <button onClick={console.log('clicked the button')}>button</button>
        This is also flawed. It leads to an infinite loop cause each call of setValue(0)
        rerenders page which in turn calls setValiue again:
        <button onClick={setValue(0)}>button</button>
        These last two versions are ok:
        <button onClick={() => console.log('clicked button')}>button</button>
        <button onClick={() => setValue(0)}>button</button> */}
        <button onClick={handleClick}>button</button>
      </div>
    )
  }

export default App

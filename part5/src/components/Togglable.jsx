// extract the toggle funvtionality into a seperate component
import { useState } from "react"

const Togglable = (props) => {
  // state 'visible' = visibility of props.children (here: LoginForm) 
  // set default to false, meaning not visible: 
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => toggleVisibility()}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
      {/* props.children is automatically added by React and always exists */}
        {props.children}
        <button onClick={() => toggleVisibility()}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
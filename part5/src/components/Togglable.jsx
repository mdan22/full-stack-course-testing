// extract the toggle funvtionality into a seperate component
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// the fct that creates component is wrapped inside a
// forwardRef fct call -> the component can access the ref(s)
const Togglable = forwardRef((props, ref) => {
  // state 'visible' = visibility of props.children (here: LoginForm)
  // set default to false, meaning not visible:
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // useImperativeHandle hook is used to expose/make...available
  // toggleVisibility fct to the parent component
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

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
)

Togglable.propTypes = {
  // define buttonLabel as a required string-type prop
  // a warning is shown in browser console
  // if it is not defined when using the component
  buttonLabel: PropTypes.string.isRequired,

  // define children as an optional node-type prop
  // (anything is allowed that can be rendered)
  children: PropTypes.node
}


// Set the display name for the component
// note: without this the component is Anonymous, which
// can be seen in Components tab of react-devtools in browser
Togglable.displayName = 'Togglable'

export default Togglable
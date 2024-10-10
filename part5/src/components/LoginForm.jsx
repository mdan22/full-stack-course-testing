// moved the states (username + password) related to the
// loginForm into its own component
// even though it wasn't required (it was an optional exercise)

import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // when login form is submitted, the handleSubmit fct is called
  const onSubmit = async (event) => {
    event.preventDefault()
    const success = await handleSubmit(username, password)
    // we reset the fields if login was successful
    if (success) {
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={onSubmit}>
        <div>
         username
          <input
            data-testid='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
         password
          <input
            data-testid='password'
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm
// We could move the states (username + password) related to the loginForm into its own component, but we'll leave that for an optional exercise.
// Plan on doing that.

import { useState } from "react"

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // when login form is submitted, the handleLogin fct is called
  const onSubmit = async (event) => {
    event.preventDefault()
    const success = await handleLogin(username, password)
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
           value={username}
           onChange={({ target }) => setUsername(target.value)}
         />
       </div>
       <div>
         password
         <input
           type="password"
           value={password}
           onChange={({ target }) => setPassword(target.value)}
         />
     </div>
       <button type="submit">login</button>
     </form>
   </div>
 )
}

export default LoginForm
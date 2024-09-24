const jwt = require('jsonwebtoken') // needed to generate the tokens
const bcrypt = require('bcrypt') // needed to encrypt passwords / tokens
const loginRouter = require('express').Router() // needed to handle the post route (to log in)
const User = require('../models/user') // needed to do asynchronous db operations like User.find({}) or User.save()

// url will (probably) be /api/login

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body // destructuring

  const user = await User.findOne({ username }) // check if username exists in db
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash) // check if password is correct

  // if either user or password is not correct, respond with error message
  if(!(user && passwordCorrect)) {
    response.status(401).json({ // unauthorized
      error: 'invalid username or password'
    })
  }

  // generate token for user
  const userForToken = {
    username: user.username,
    id: user.id,
  }
  // the created token contains the username and the user id in a digitally signed form
  const token = jwt.sign(
    userForToken, process.env.SECRET,
    { expiresIn: 60*60 } // set token expiration time to 1h
  )

  response
    .status(200) // ok
    // apparently we need to send token, username and name in the response
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter

// If the application has multiple interfaces requiring identification,
// JWT's validation should be separated into its own middleware.
// An existing library like express-jwt could also be used.

// Note: Problems of Token-based authentication:
// The shorter the expiration time, the more safe the solution is.
// But a short expiration time forces a potential pain to a user,
// one must login to the system more frequently.

// The other solution is to save info about each token to the backend database
// and to check for each API request if the access rights corresponding to
// the tokens are still valid. With this scheme, access rights can be revoked at any time.
// This is called a server-side session.

// The negative aspect of server-side sessions is the increased complexity in the backend
// and also the effect on performance.
// That is why it is quite common to save the session corresponding to a token to
// a key-value database such as Redis, that is limited in functionality compared to
// e.g. MongoDB or a relational database, but extremely fast in some usage scenarios.

// also: Usernames, passwords and applications using token authentication must always be used over HTTPS.
// We could use a Node HTTPS server in our application instead of the HTTP server
// (it requires more configuration). On the other hand, the production version of our
// application is in Fly.io, so our application stays secure (Fly.io and Render.com route all traffic via HTTPS).

// Due to making many changes, most of the tests have broken. Because this part of the course
// is already jammed with new information, we will leave fixing the tests
// to a non-compulsory exercise.

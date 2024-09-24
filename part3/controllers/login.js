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
  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200) // ok
    // apparently we need to send token, username and name in the response
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter

// If the application has multiple interfaces requiring identification,
// JWT's validation should be separated into its own middleware.
// An existing library like express-jwt could also be used.

const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // make sure the password is strong enough (for optional exercise)
  // check password length
  if (!password || password.length < 8 || password.length > 20) {
    return response.status(400).json({
      error: 'Password must consist of at least 8 and a maximum of 20 characters'
    })
  }
  // check password strength
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/
  if (!passwordRegex.test(password)) {
    return response.status(400).json({
      error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // create a user to be saved in DB
  const user = new User({
    username,
    name,
    passwordHash, // passwordhash is saved in DB, not the password!!!
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser) // created
})

usersRouter.get('/', async (request, response) => {
  // making a query that joins notes and users and returns
  // only the content and important fields
  const users =
  await User
    .find({})
    .populate('notes', { content: 1, important: 1 })

  response.json(users)
})

module.exports = usersRouter

const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  res.json(users.map(user => user.toJSON()))
})

usersRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      res.json(user.toJSON())
    } else {
      res.status(404).end()
    }
  } catch(exception) {
    res.json(exception)
  }
})

usersRouter.post('/', async (req, res) => {
  const body = req.body
  if (body.password.length < 3) {
    return res.status(400).json({ error: 'password too short' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })
  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser.toJSON)
  } catch (exception) {
    res.status(400).json(exception.message)
  }


})

module.exports = usersRouter
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    res.json(blogs.map(blog => blog.toJSON()))
  })

  const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }
  
  blogsRouter.post('/', async (req, res) => {
    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      res.status(201).json(savedBlog.toJSON)
      
    } catch(exception) {
      res.status(400).json(exception)
    }

  })

  blogsRouter.delete('/:id', async (req, res) => {
    try {
      await Blog.findByIdAndRemove(req.params.id)
      res.status(204).end()
    } catch(exception){
      res.status(400).json(exception)
    }
  })

  blogsRouter.get('/:id', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id)
      if (blog) {
        res.json(blog.toJSON())
      } else {
        res.status(404).end()
      }
    } catch(exception) {
      res.json(exception)
    }
  })
  

/* EI TOIMI
  blogsRouter.put('/:id', async (req, res) => {
    const body = req.body

    const blog = {
      likes: body.likes
    }

    try {
      const newBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
      res.json(newBlog)
    } catch(exception) {
      res.json(exception)
    }
  })
*/
  module.exports = blogsRouter
  
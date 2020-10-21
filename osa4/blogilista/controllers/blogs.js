const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
    Blog
      .find({})
      .then(blogs => {
        res.json(blogs)
      })
  })
  
  blogsRouter.post('/', (req, res) => {
    const body = req.body
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })
    blog
      .save()
      .then(result => {
        res.status(201).json(result)
      })
  })

  module.exports = blogsRouter
  
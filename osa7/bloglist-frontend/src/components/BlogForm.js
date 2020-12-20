import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const BlogForm = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')


  const addBlog = async (event) => {
    event.preventDefault()
    const content = {
      title: title,
      author: author,
      url: blogUrl
    }
    props.createBlog(content)
    setTitle('')
    setAuthor('')
    setBlogUrl('')
    props.setNotification(`Blog created ${content.title}`)
    setTimeout(() => {
      props.setNotification('')
    }, 5000)
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form-Label>Title: </Form-Label>
          <Form.Control id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form-Label>Author: </Form-Label>
          <Form.Control id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form-Label>Url: </Form-Label>
          <Form.Control id="url"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
          <Button id="submitBlog" type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  createBlog, setNotification
}

const ConnectedBlogs = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)

export default ConnectedBlogs
import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

//const BlogForm = ({ createBlog, props }) => {
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
      <h2>create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title<input id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author<input id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url<input id="url"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button id="submitBlog" type="submit">create</button>
      </form>
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

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)

export default ConnectedAnecdotes
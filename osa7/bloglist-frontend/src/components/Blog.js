import React, { useState } from 'react'
import { addLike } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


//const Blog = ({ blog, addLike, deleteBlog }) => {
const Blog = (props) => {

  let [open, setOpen] = useState(false)

  const setLike = (blog) => {
    console.log('vote', blog.id)
    console.log('notification', blog.title)
    props.addLike(blog)
    props.setNotification(`You added a like to ${blog.title} by ${blog.author}`)
    setTimeout(() => {
      props.setNotification('')
    }, 5000)
  }

  const removeBlog = (blog) => {
    console.log('remove', blog.id)
    const deleteWarning = window.confirm(`Remove '${blog.title}' by ${blog.author}?`)
    if (deleteWarning) {
      props.deleteBlog(blog.id)
      props.setNotification(`You removed blog '${blog.title}' by ${blog.author}`)
      setTimeout(() => {
        props.setNotification('')
      }, 5000)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = () => {
    setOpen(open = !open)
  }

  if (!open) {
    return (
      <div id="blogList" style={blogStyle}>
        <div>
          {props.blog.title} {props.blog.author} <button id="viewButton" onClick={handleClick}>view</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>
          {props.blog.title} {props.blog.author} <button onClick={handleClick}>view</button>
        </div>
        <div>
          <p>{props.blog.url}</p>
          <p>{props.blog.likes}<button id="likeButton" onClick={() => setLike(props.blog)}>like</button></p>
          <button id="removeButton" onClick={() => removeBlog(props.blog)}>remove blog</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  addLike,
  setNotification,
  deleteBlog
}

const ConnectedBlogs = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)


export default ConnectedBlogs

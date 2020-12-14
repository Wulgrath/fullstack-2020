import React from 'react'
import { Link } from 'react-router-dom'
import { addLike } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const BlogList = (props) => {

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

  return (
    <div id="blogList" style={blogStyle}>
      <div>
        <Link to={`/blogs/${props.blog.id}`}>
          {props.blog.title} {props.blog.author}
        </Link>
        <div>
          <button id="removeButton" onClick={() => removeBlog(props.blog)}>remove blog</button>
        </div>
      </div>
    </div>
  )

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
)(BlogList)


export default ConnectedBlogs

import React from 'react'
import { useParams } from 'react-router-dom'
import { addLike } from '../reducers/blogReducer'
import { addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { Button } from 'react-bootstrap'

const Blog = (props) => {
  const content = useField('text')

  const id = useParams().id
  const blog = props.blogs.find(n => n.id === id)


  const setLike = (blog) => {
    console.log('vote', blog.id)
    console.log('notification', blog.title)
    props.addLike(blog)
    props.setNotification(`You added a like to ${blog.title} by ${blog.author}`)
    setTimeout(() => {
      props.setNotification('')
    }, 5000)
  }

  const setComment = async (event) => {
    event.preventDefault()
    props.addComment(blog.id, {content: content.value})
    content.reset()
    props.setNotification(`You added a new comment`)
    setTimeout(() => {
      props.setNotification('')
    }, 5000)
  }

  const newContent = {...content}
  delete newContent.reset

  if (blog) {
    return (
      <div>
        <h2>{blog.title} by {blog.author}</h2>
        <div>{blog.url}</div>
        <div>{blog.likes} likes <Button size='sm' id="likeButton" onClick={() => setLike(blog)}>like</Button></div>
        <div>Blog added by {blog.user.name}</div>
        <h3>Comments</h3>
        <form onSubmit={setComment}>
        <input {...newContent}/><Button type='submit'>add comment</Button>
        </form>
        {blog.comments.map(comment => 
          <ul key={comment.content}>
            <li>{comment.content}</li>
          </ul>
            )}
      </div>
    )
  } else {
    return null
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
  addComment
}

const ConnectedBlogs = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)

export default ConnectedBlogs
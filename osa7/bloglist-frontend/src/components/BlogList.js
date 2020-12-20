import React from 'react'
import { Link } from 'react-router-dom'
import { addLike } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'

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

  const sortedBlogs = () => {
    return props.blogs.sort(({ likes: prevLikes }, { likes: curLikes }) => curLikes - prevLikes)
  }


  return (
    <div>
      <Table striped>
        <tbody>
          {sortedBlogs().map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.author}
              </td>
              <td>
              <Button size='sm' variant='secondary' id="removeButton" onClick={() => removeBlog(blog)}>remove blog</Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
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

import React, { useState } from 'react'
const Blog = ({ blog, addLike, deleteBlog, user }) => {

  let [open, setOpen] = useState(false)

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
          {blog.title} {blog.author} <button id="viewButton" onClick={handleClick}>view</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="openBlogs" style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={handleClick}>view</button>
        </div>
        <div>
          <p>{blog.url}</p>
          <p id="showLikes">{blog.likes}<button id="likeButton" onClick={() => addLike(blog.id)}>like</button></p>
          { blog.user.username === user.username ?
          <button id="removeButton" onClick={() => deleteBlog(blog.id, blog.title, blog.author)}>remove blog</button>
          : null
          }
          </div>
      </div>
    )
  }
}

export default Blog

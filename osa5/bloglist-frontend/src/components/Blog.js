import React, { useState } from 'react'
const Blog = ({ blog, user }) => {

  let [open, setOpen] = useState(true)

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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={handleClick}>view</button>
      </div>
      <div style={{ display: open ? 'none' : '' }}>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
        <p>{user.name}</p>
      </div>
    </div>
  )
}

export default Blog

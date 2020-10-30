import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: blogUrl
    })
    setTitle('')
    setAuthor('')
    setBlogUrl('')
  }
    /*blogService.create(blogObject)
      .then(response => {
        setBlogs(blogs.concat(response.data))
        setTitle('')
        setAuthor('')
        setBlogUrl('')
        setNotification(`a new blog ${title} added`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch(error => {
        setNotification('invalid blog')
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
  }
*/

  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title<input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author<input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url<input
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
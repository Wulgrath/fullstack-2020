import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  return (
    <div>
      <div className="notification">
        {notification}
      </div>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`successfully logged in as ${user.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      setNotification('wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const addBlog = (blogObject) => {
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification(`a new blog ${blogObject.title} added`)
        blogFormRef.current.toggleVisibility()
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch(() => {
        setNotification('invalid blog')
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
  }

  const addLike = (id) => {   
    const blog = blogs.find(n => n.id === id)
    const newObject = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    blogService
      .update(id, newObject)
      .then(response => {

      })
      .catch(error => {
        console.log(error)
        setNotification('something went wrong')
        setTimeout(() => {
        }, 3000)
      },
      setBlogs(blogs.filter(n => n.id !== id))
      )
  }

  const deleteBlog = (id, title, author) => {
    const deleteWarning = window.confirm(`Remove '${title}' by ${author}?`)
    if (deleteWarning) {
      blogService
        .remove(id)
      setNotification(`The blog '${title}' was removed`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
      setBlogs(blogs.filter(n => n.id !== id))
    }
  }

  const logOut = () => {
    window.localStorage.clear()
  }

  const blogFormRef = useRef()

  const sortedBlogs = blogs.sort(({ likes: prevLikes }, { likes: curLikes }) => prevLikes - curLikes)

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <h2>Log in</h2>
          <button id="login" onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            user={user}
            blogs={blogs}
            logOut={logOut}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? loginForm() :
        <div>
          <p>logged in as {user.name}</p><button onClick={() => logOut()}>logout</button>
        </div>
      }
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      <div>
        {sortedBlogs.map((blog, i) =>
          <Blog key={i}
            blog={blog}
            addLike={addLike}
            deleteBlog={deleteBlog}
            user={user}
          />
        )}
      </div>
    </div>
  )
}

export default App
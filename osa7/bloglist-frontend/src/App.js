import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { initBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const App = (props) => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

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
    } catch (exception) {

    }
  }

  const logOut = () => {
    window.localStorage.clear()
  }

  const blogFormRef = useRef()

  const sortedBlogs = () => {
    return props.blogs.sort(({ likes: prevLikes }, {likes: curLikes}) => curLikes - prevLikes)
  }
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
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Notification />
      {user === null ? loginForm() :
        <div>
          <p>logged in as {user.name}</p><button onClick={() => logOut()}>logout</button>
        </div>
      }
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
        />
      </Togglable>
      <h2>Blogs</h2>
      <div>
        {sortedBlogs().map(blog =>
          <Blog key={blog.id}
            blog={blog}
            user={user}
          />
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const ConnectedAnecdotes = connect(
  mapStateToProps
)(App)

export default ConnectedAnecdotes
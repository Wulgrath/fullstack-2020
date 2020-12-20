import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import './App.css'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { login, loggedIn } from './reducers/loginReducer'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'


const App = (props) => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.loggedIn(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logOut = () => {
    window.localStorage.clear()
  }

  const blogFormRef = useRef()

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }


    return (
      <div>
        <div style={hideWhenVisible}>
          <h2>Log in</h2>
          <Button id="login" onClick={() => setLoginVisible(true)}>log in</Button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
          <Button variant='secondary' onClick={() => setLoginVisible(false)}>cancel</Button>
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <div>
        <h1>Blog App</h1>
      </div>
      <Notification />
      {props.user === null ? loginForm() :
        <div>
          <p>logged in as {props.user.name}</p><Button variant='dark' onClick={() => logOut()}>logout</Button>
        </div>
      }
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
        />
      </Togglable>
      <Navigation />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.loggedUser
  }
}

const mapDispatchToProps = {
  login, loggedIn
}

const ConnectedBlogs = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedBlogs
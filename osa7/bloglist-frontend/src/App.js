import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import blogService from './services/blogs'
import './App.css'
import Container from '@material-ui/core/Container'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { login, loggedIn } from './reducers/loginReducer'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

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

  const padding = {
    paddingRight: 5
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
    <Container>
      <div>
        <h1>Blog App</h1>
      </div>
      <Notification />
      {props.user === null ? loginForm() :
        <div>
          <p>logged in as {props.user.name}</p><button onClick={() => logOut()}>logout</button>
        </div>
      }
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
        />
      </Togglable>
      <Router>
        <div>
          <Link style={padding} to='/'><button className="btn btn-outline-info">Blogs</button></Link>
          <Link to='/users'><button className="btn btn-outline-info">Users</button></Link>
        </div>
        <Switch>
          <Route path='/users/:id'>
            <User />
          </Route>
          <Route path='/blogs/:id'>
            <Blog />
          </Route>
          <Route path='/users'>
            <UserList />
          </Route>
          <Route path='/'>
            <h2>Blogs</h2>
            <BlogList />
          </Route>
        </Switch>
      </Router>
    </Container>
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
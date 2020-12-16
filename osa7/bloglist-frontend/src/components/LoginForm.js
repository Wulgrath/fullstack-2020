import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { login } from '../reducers/loginReducer'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const LoginForm = (props) => {

  const handleLogin = (event) => {
    event.preventDefault()
    const user = ({
      username: props.username,
      password: props.password,
    })
    props.login(user)
    blogService.setToken(user.token)
    props.setUsername('')
    props.setPassword('')
  }


  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form-Label>username:</Form-Label>
          <Form.Control
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        <Form-Label>password:</Form-Label>
          <Form.Control
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
          />
        <Button variant="primary" id="loginButton" type="submit">Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser
  }
}

const mapDispatchToProps = {
  login
}

const ConnectedBlogs = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)


export default ConnectedBlogs
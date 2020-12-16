import loginService from '../services/login'
import { setNotification } from './notificationReducer'

export const loggedIn = (user) => {
  return async dispatch => {
    dispatch({
      type: 'INITLOGIN',
      data: user
    })
  }
}

export const login = (content) => {
  return async dispatch => {
    try {
      const user = await loginService.login(content)
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      dispatch({
        type: 'LOGIN',
        data: user
      })
      dispatch(setNotification(`Succesfully logged in as ${user.name}`))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 5000)
    } catch (exception) {
      dispatch(setNotification('Invalid username or password'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 5000)
    }

  }
}

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'INITLOGIN':
      return action.data
      default: return state
  }
}


export default loginReducer
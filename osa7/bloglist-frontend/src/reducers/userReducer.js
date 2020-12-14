import userService from '../services/users'

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INITUSERS',
      data: users
    })
  }
}

const userReducer = (state = [], action) => {

  switch (action.type) {
    case 'INITUSERS': 
      return [...state, action.data]
      default: return state
  }
}

export default userReducer
let timer = 0

export const setNotification = (notification, timeOut) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: notification
    })
    if (timer) {
      clearTimeout(timer)
      timer = 0
      console.log('cleared', timer)
    }
    timer = setTimeout(() => {
      dispatch({
        type: 'DELNOTIFY',
        data: ''
      })
    }, timeOut * 1000)
    }
  }




const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.data
    case 'DELNOTIFY':
      return action.data
    default: return state
  }
}




export default notificationReducer
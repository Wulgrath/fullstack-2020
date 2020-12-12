export const setNotification = (notification) => {
  return {
    type: 'NOTIFY',
    notification
  }
}

const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      const currentNotification = action.notification
      return currentNotification
    default: return state
  }
}

export default notificationReducer
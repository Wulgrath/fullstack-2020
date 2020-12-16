export const setNotification = (notification) => {
  return {
    type: 'NOTIFY',
    notification
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY':
      const currentNotification = action.notification
      return currentNotification
    default: return state
  }
}

export default notificationReducer
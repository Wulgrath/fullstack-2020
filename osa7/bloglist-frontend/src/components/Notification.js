import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification) {
    return (
      <div>
        <Alert variant="info">
          {notification}
        </Alert>
      </div>
    )
  } else {
    return (
      <div>

      </div>
    )
  }

}

export default Notification
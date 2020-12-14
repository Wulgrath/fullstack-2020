import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {

  const users = useSelector(state => state.users)

  const id = useParams().id
  const user = users[0].find(n => n.id === id)
  console.log(user)
  
  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added Blogs</h3>
        {user.blogs.map(blog => 
          <ul key={blog.id}> 
          <li>{blog.title}</li>
          </ul>
          )}
      </div>
    )
  } else {
    return null
  }


}


export default User
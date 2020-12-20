import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {

  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>
              User
            </th>
            <th>
              Blogs created
            </th>
          </tr>
          {users.map(user =>
            <tr key={user}>
              {user.map(singleUser =>
                <tr key={singleUser.id}>
                  <td><Link to={`/users/${singleUser.id}`}>{singleUser.username}</Link></td>
                  <td>{singleUser.blogs.length}</td>
                </tr>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
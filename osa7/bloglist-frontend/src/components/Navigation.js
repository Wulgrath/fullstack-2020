import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import BlogList from './BlogList'
import Blog from './Blog'
import UserList from './UserList'
import User from './User'


const Navigation = () => {

  return (
    <div>
      <Router>
        <div>
          <Link to='/'><button className="btn btn-outline-info">Blogs</button></Link>
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
    </div>
  )

}



export default Navigation
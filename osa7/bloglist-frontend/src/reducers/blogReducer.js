import blogService from '../services/blogs'


export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW',
      data: newBlog
    })
  }
}

export const addLike = (blog) => {
  const newBlog = {
    ...blog, likes: blog.likes + 1
  }
  return async dispatch => {
    await blogService.update(blog.id, newBlog)
    dispatch({
      type: 'LIKE',
      data: { id: blog.id }
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: { id }
    })
  }
}

const blogReducer = (state = [], action) => {
  console.log(state)
  console.log(action)

  switch (action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'INIT':
      return action.data
    case 'LIKE':
      const id = action.data.id
      const blogToVote = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToVote, likes: blogToVote.likes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
        )
    case 'DELETE':
      return state.filter(n => n.id !== action.data.id)
      default: return state
  }
}

export default blogReducer
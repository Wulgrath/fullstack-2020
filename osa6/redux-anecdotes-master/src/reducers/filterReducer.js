

export const filterChange = (content) => {
  return {
    type: 'SET FILTER',
    content
  }
}

const filterReducer = (state = '', action) => {
  console.log(action.type)
  switch (action.type) {
    case 'SET_FILTER':
      return action.content
    default: return state
  }
}

export default filterReducer
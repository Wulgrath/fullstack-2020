const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  all: 0,
  average: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      initialState.good = initialState.good + 1
      initialState.all = initialState.all + 1
      initialState.average = initialState.average + 1
      return initialState
    case 'OK':
      initialState.ok = initialState.ok + 1
      initialState.all = initialState.all + 1
      return initialState
    case 'BAD':
      initialState.bad = initialState.bad + 1
      initialState.all = initialState.all + 1
      initialState.average = initialState.average - 1
      return initialState
    case 'ZERO':
      initialState.good = initialState.good = 0
      initialState.ok = initialState.ok = 0
      initialState.bad = initialState.bad = 0
      initialState.all = initialState.all = 0
      initialState.average = initialState.average = 0
      return initialState
    default: return state
  }
}

export default counterReducer
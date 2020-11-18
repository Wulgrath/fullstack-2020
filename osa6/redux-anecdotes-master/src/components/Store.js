import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/anecdoteReducer'


export const Store = () => {
    return {
        store = createStore(reducer, composeWithDevTools())
    }
}



export default Store
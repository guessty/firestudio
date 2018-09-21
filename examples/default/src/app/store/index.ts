import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
//
import combinedReducers from './reducers'

const initStore = (initialState = {}) => {
  if (process.env.NODE_ENV === 'development') {
    return createStore(combinedReducers, initialState, composeWithDevTools())
  }
  return createStore(combinedReducers, initialState)
}

export default initStore

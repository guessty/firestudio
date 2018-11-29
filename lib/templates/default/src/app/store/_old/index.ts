import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import initSubscriber from 'redux-subscriber'
//
import combinedReducers from './reducers'

const initStore = (initialState = {}) => {
  const createdStore = (process.env.NODE_ENV === 'development') ?
    createStore(combinedReducers, initialState, composeWithDevTools(applyMiddleware(thunk)))
    :
    createStore(combinedReducers, initialState, applyMiddleware(thunk))
  initSubscriber(createdStore)
  return createdStore
}

export default initStore

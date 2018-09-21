import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
//
import async from '@store/async/reducers'

export default combineReducers({
  async,
  toastr: toastrReducer,
})

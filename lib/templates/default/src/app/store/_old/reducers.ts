import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
//
import api from '@store/api/reducers'

export default combineReducers({
  api,
  toastr: toastrReducer,
})

import { createReducer } from '@store/utils'
import * as constants from './constants'

const initialState = {
  loading: false,
}

export const asyncActionStarted = state => ({
  ...state, loading: true,
})

export const asyncActionFinished = state => ({
  ...state, loading: false,
})

export const asyncActionError = state => ({
  ...state, loading: false,
})

export default createReducer(initialState, {
  [constants.ASYNC_ACTION_START]: asyncActionStarted,
  [constants.ASYNC_ACTION_FINISH]: asyncActionFinished,
  [constants.ASYNC_ACTION_ERROR]: asyncActionError,
})

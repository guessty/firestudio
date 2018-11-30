import { createReducer } from '@store/helpers'
import * as constants from './constants'
//

const initialState = {}

export const apiRequestSent = (state, payload) => ({
  ...state,
  [payload.url]: {
    ...payload,
    pending: true,
  },
})

export const apiResponseReceived = (state, payload) => ({
  ...state,
  [payload.url]: undefined,
})

export default createReducer(initialState, {
  [constants.API_REQUEST_SENT]: apiRequestSent,
  [constants.API_RESPONSE_RECEIVED]: apiResponseReceived,
})

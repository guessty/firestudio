import * as constants from './constants'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
//

const apiRequestSent = (url, willTakeResponse, requestCount) => ({
  payload: {
    requestCount,
    url,
    willTakeResponse,
  },
  type: constants.API_REQUEST_SENT,
})

const apiResponseRecieved = url => ({
  payload: {
    url,
  },
  type: constants.API_RESPONSE_RECEIVED,
})

interface IAPIRequestConfigProps {
  url: string
}

const axiosRequest = (requestConfig: IAPIRequestConfigProps) => dispatch =>
  axios(requestConfig)
    .then(response => response)
    .catch(thrown => {
      toastr.error('Error', thrown.message)
      dispatch(apiResponseRecieved(requestConfig.url))
      return thrown
    })

export const request = (requestConfig: IAPIRequestConfigProps, takeResponse?: string) => (dispatch, getState) => {
  const api = getState().api[requestConfig.url]
  const requestCount = api && api.requestCount ? api.requestCount : 0

  switch (takeResponse) {
    case 'first':
      if (!api) {
        dispatch(apiRequestSent(requestConfig.url, 'first', 1))
        return dispatch(axiosRequest(requestConfig))
          .then(response => {
            dispatch(apiResponseRecieved(requestConfig.url))
            return response
          })
      }
      return
    case 'last':
      const nextRequestCount = requestCount + 1
      dispatch(apiRequestSent(requestConfig.url, 'last', requestCount + 1))
      return dispatch(axiosRequest(requestConfig))
        .then(response => {
          if (getState().api[requestConfig.url].requestCount === nextRequestCount) {
            dispatch(apiResponseRecieved(requestConfig.url))
            return response
          }
          return {}
        })
    default:
      dispatch(apiRequestSent(requestConfig.url, 'every', requestCount + 1))
      return dispatch(axiosRequest(requestConfig))
        .then(response => {
          dispatch(apiResponseRecieved(requestConfig.url))
          return response
        })
  }
}

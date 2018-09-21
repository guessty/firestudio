import * as constants from './constants'

export const asyncActionStart = () => ({
  type: constants.ASYNC_ACTION_START,
})

export const asyncActionFinish = () => ({
  type: constants.ASYNC_ACTION_FINISH,
})

export const asyncActionError = () => ({
  type: constants.ASYNC_ACTION_ERROR,
})

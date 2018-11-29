import axios from 'axios'
import { Container } from '@store/store'
//

interface IAPIRequestConfigProps {
  url: string
  cancelToken?: any
}

class Api extends Container {
  state = {}

  update = (key, updates) => {
    this.setState(state => {
      state[key] = {
        ...state[key],
        ...updates,
      }
    })
  }

  request = async (config: IAPIRequestConfigProps, key?: string, take?: string) => {
    const requestKey = key || config.url
    const currentApiRequest = this.state[requestKey] || {}
    const count = currentApiRequest + 1 || 1

    try {
      let axiosConfig = config
      let call = null

      if (take === 'first' && currentApiRequest.status === 'pending') {
        throw new Error('Please wait - request still pending...')
      }

      if (take === 'last') {
        if (currentApiRequest.call) {
          currentApiRequest.call.cancel()
        }
        call = axios.CancelToken.source()
        axiosConfig = {
          ...config,
          cancelToken: call.token,
        }
      }
      await this.update(requestKey, { status: 'pending', count, call })
      const response = await axios(axiosConfig)
      await this.update(requestKey, { status: null, count: null, call: null })
      return response
    } catch (thrown) {
      if (axios.isCancel(thrown)) {
        /* tslint:disable-next-line */
        console.log('Request canceled', thrown.message)
      } else {
        await this.update(requestKey, { status: null, count: null, call: null })
        /* tslint:disable-next-line */
        console.log(thrown)
      }
    }
  }
}

export default Api

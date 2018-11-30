import { Container } from '@store/store'
//

class Toast extends Container {
  state = []

  add = toast => {
    this.setState([
      ...this.state,
      toast,
    ])
  }
}

export default Toast

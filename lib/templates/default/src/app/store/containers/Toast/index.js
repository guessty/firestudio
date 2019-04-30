import { Container } from '@store';
//

class Toast extends Container {
  state = []

  add = (toast) => {
    const currentState = this.state;

    this.setState([
      ...currentState,
      toast,
    ]);
  }
}

export default Toast;

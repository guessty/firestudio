import { Container } from '@firepress/core/store';
//

export default class Toast extends Container {
  state = []

  add = (toast) => {
    const currentState = this.state;

    this.setState([
      ...currentState,
      toast,
    ]);
  }
}

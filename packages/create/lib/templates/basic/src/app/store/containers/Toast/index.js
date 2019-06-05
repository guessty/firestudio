import { Container } from '@firestudio/core/store';
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

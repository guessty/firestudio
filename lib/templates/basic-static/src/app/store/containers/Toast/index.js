import Container from '@store/containers/Base';
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

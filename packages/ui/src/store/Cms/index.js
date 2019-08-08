import { Container } from '@firepress/core/store';
//

export default class Cms extends Container {
  state = {
    readOnly: true,
  }

  toggleRead = () => {
    const { readOnly } = this.state;
    this.setState({
      readOnly: !readOnly,
    });
  }
}

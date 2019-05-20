import { Component } from 'react';
import PropTypes from 'prop-types';
//
import { Modal as ModalContainer } from '@store/containers';
import { subscribe } from '@store';

class ModalTrigger extends Component {
  static propTypes = {
    target: PropTypes.string.isRequired,
    modal: PropTypes.shape({
      state: PropTypes.shape({}).isRequired,
      toggle: PropTypes.func.isRequired,
    }).isRequired,
    render: PropTypes.func.isRequired,
  }

  render() {
    const { render, target, modal } = this.props;
    const isOpen = modal.isOpen(target);

    return render({ isOpen, toggleModal: () => modal.toggle(target) });
  }
}

export default subscribe({ modal: ModalContainer })(ModalTrigger);

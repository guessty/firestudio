import { Component } from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from '@firestudio/core/store';
//
import { Modal as ModalContainer } from '../../../containers';

class ModalTrigger extends Component {
  static propTypes = {
    target: PropTypes.string,
    modal: PropTypes.shape({
      state: PropTypes.shape({}).isRequired,
      toggle: PropTypes.func.isRequired,
    }),
    render: PropTypes.func.isRequired,
  }

  render() {
    const { render, target, modal } = this.props;

    return render(modal ? {
      isOpen: modal.isOpen(target),
      toggleModal: () => modal.toggle(target)
    } : {});
  }
}

export default Subscribe({ modal: ModalContainer })(ModalTrigger);

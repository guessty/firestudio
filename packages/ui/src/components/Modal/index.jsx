import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from '@firestudio/core/store';

import { Modal as ModalContainer } from '../../containers';
import Base from './Base';
import Trigger from './Trigger';

class Modal extends Component {
  static propTypes = {
    name: PropTypes.string,
    modal: PropTypes.shape({
      register: PropTypes.func.isRequired,
      deregister: PropTypes.func.isRequired,
      close: PropTypes.func.isRequired,
    }),
    onDismiss: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  };

  static defaultProps = {
    modal: undefined,
    name: undefined,
    onDismiss: () => {},
  };

  static Base = Base;

  static Trigger = Trigger;

  componentDidMount() {
    const { modal, name } = this.props;
    if (modal) {
      modal.register(name);
    }
  }

  componentWillUnmount() {
    const { modal, name } = this.props;
    if (modal) {
      modal.deregister(name);
    }
  }

  handleDismiss = (e) => {
    const { modal, name, onDismiss } = this.props;
    if (modal) {
      modal.close(name);
    }
    onDismiss(e);
  }

  render() {
    const {
      name, modal, children,
      onDismiss, isOpen,
      ...props
    } = this.props;

    const isModalOpen = modal ? modal.isOpen(name) : isOpen;

    return (
      <Base
        {...props}
        isOpen={isModalOpen}
        onDismiss={this.handleDismiss}
      >
        {children}
      </Base>
    );
  }
}

export default Subscribe({ modal: ModalContainer })(Modal);

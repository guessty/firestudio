import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisuallyHidden from '@reach/visually-hidden';
import { Modal as UiModal, Transition } from '@firestudio/ui';

import { Modal as ModalContainer } from '@store/containers';
import { subscribe } from '@store';

export { default as Trigger } from './Trigger';

class Modal extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    modal: PropTypes.shape({
      state: PropTypes.shape({}).isRequired,
      register: PropTypes.func.isRequired,
      close: PropTypes.func.isRequired,
    }).isRequired,
    onClose: PropTypes.func,
    onSetClose: PropTypes.func,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    closeButtonClassName: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  };

  static defaultProps = {
    onClose: () => {},
    onSetClose: () => {},
    className: '',
    containerClassName: 'justify-center w-full p-6 pt-24 sm:p-0 sm:items-center sm:flex-grow pointer-events-none',
    contentClassName: 'w-full justify-center max-w-sm p-6 sm:p-12 bg-grey-lighter-40 pointer-events-auto',
    closeButtonClassName: '',
  };

  componentDidMount() {
    const {
      modal,
      name,
      onSetClose,
    } = this.props;
    modal.register(name);
    onSetClose(this.handleClose);
  }

  componentWillUnmount() {
    const { modal, name, onSetClose } = this.props;
    onSetClose(() => {});
    modal.deregister(name);
  }

  handleClose = (e) => {
    const { modal, name, onClose } = this.props;
    modal.close(name);
    onClose(e);
  }

  render() {
    const {
      className, closeButtonClassName,
      containerClassName, contentClassName,
      children, name, modal,
      ...props
    } = this.props;

    const isOpen = modal.isOpen(name);

    return (
      <UiModal
        {...props}
        isOpen={isOpen}
        onDismiss={this.handleClose}
        className={`${className} text-black`}
        transitionProps={{
          in: Transition.TRANSITIONS.DOWN,
          out: Transition.TRANSITIONS.NONE,
        }}
      >
        <div className={`relative flex ${containerClassName}`}>
          <div className={`relative flex flex-col ${contentClassName}`}>
            <button
              type="button"
              className={`absolute pin-r pin-t p-6 ${closeButtonClassName}`}
              onClick={this.handleClose}
            >
              <VisuallyHidden>
                Close
              </VisuallyHidden>
            </button>
            {children}
          </div>
        </div>
      </UiModal>
    );
  }
}

export default subscribe({ modal: ModalContainer })(Modal);

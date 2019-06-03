import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@firestudio/ui';

export default class Drawer extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }
  
  static Trigger = Dialog.Trigger

  render() {
    const { name, children } = this.props;

    return (
      <Dialog
        name={name}
        unmountingDelay={500}
        render={({ Overlay, Content, isOpen }) => (
          <>
            <Transition
              isIn={isOpen}
              in={{ fade: false, type: 'slide', direction: 'left', speed: 'normal' }}
              out={{ fade: false, type: 'slide', direction: 'right', speed: 'normal' }}
            >
              <Overlay className="w-1/4" />
            </Transition>
            <Transition
              isIn={isOpen}
              in={{ fade: false, type: 'slide', direction: 'right', speed: 'normal' }}
              out={{ fade: false, type: 'slide', direction: 'left', speed: 'normal' }}
            >
              <Content className="w-3/4 h-screen max-w-full" containerClassName="p-0 justify-end">
                {children}
              </Content>
            </Transition>
          </>
        )}
      />
    );
  }
}

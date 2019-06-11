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
        render={({ Overlay, Content, ...transitionProps }) => (
          <>
            <Transition
              enterTransition={{ fade: true, speed: 'normal' }}
              exitTransition={{ fade: true, speed: 'slow', delay: 'short' }}
              {...transitionProps}
            >
              <Overlay />
            </Transition>
            <Transition
              enterTransition={{ fade: false, type: 'slide', direction: 'left', speed: 'normal', delay: 'short' }}
              exitTransition={{ fade: false, type: 'slide', direction: 'right', speed: 'slow' }}
              {...transitionProps}
            >
              <Content
                className="max-w-full h-screen py-20 w-4/5 md:w-3/5 lg:w-1/2 xl:w-1/3"
                containerClassName="justify-end p-0"
              >
                {children}
              </Content>
            </Transition>
          </>
        )}
      />
    );
  }
}

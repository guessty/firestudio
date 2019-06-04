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
              in={{ fade: true, speed: 'normal' }}
              out={{ fade: true, speed: 'normal' }}
              {...transitionProps}
            >
              <Overlay />
            </Transition>
            <Transition
              in={{ fade: true, type: 'slide', direction: 'left', speed: 'normal' }}
              out={{ fade: true, type: 'slide', direction: 'right', speed: 'normal' }}
              {...transitionProps}
            >
              <Content
                className="max-w-full h-screen w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3"
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

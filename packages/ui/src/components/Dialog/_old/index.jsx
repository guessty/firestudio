// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Subscribe } from '@firepress/core/store';

// import { Dialog as DialogContainer } from '../../store';
// import Base from './Base';
// import Trigger from './Trigger';

// class Dialog extends Component {
//   static propTypes = {
//     name: PropTypes.string,
//     dialog: PropTypes.shape({
//       register: PropTypes.func.isRequired,
//       deregister: PropTypes.func.isRequired,
//       close: PropTypes.func.isRequired,
//     }),
//     onDismiss: PropTypes.func,
//     children: PropTypes.node,
//   };

//   static defaultProps = {
//     dialog: undefined,
//     name: undefined,
//     onDismiss: () => {},
//     children: null,
//   };

//   static Base = Base;

//   static Trigger = Trigger;

//   componentDidMount() {
//     const { dialog, name } = this.props;
//     if (dialog) {
//       dialog.register(name);
//     }
//   }

//   componentWillUnmount() {
//     const { dialog, name } = this.props;
//     if (dialog) {
//       dialog.deregister(name);
//     }
//   }

//   handleDismiss = (e) => {
//     const { dialog, name, onDismiss } = this.props;
//     if (dialog) {
//       dialog.close(name);
//     }
//     onDismiss(e);
//   }

//   render() {
//     const {
//       name, dialog, children,
//       onDismiss, isOpen,
//       ...props
//     } = this.props;

//     const isDialogOpen = dialog ? dialog.isOpen(name) : isOpen;

//     return (
//       <Base
//         {...props}
//         isOpen={isDialogOpen}
//         onDismiss={this.handleDismiss}
//       >
//         {children}
//       </Base>
//     );
//   }
// }

// export default Subscribe({ dialog: DialogContainer })(Dialog);

import Base from './Base';

export default Base;
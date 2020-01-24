// import { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Subscribe } from '@firepress/core/store';
// //
// import { Dialog as DialogContainer } from '../../../store';

// class Trigger extends Component {
//   static propTypes = {
//     target: PropTypes.string,
//     dialog: PropTypes.shape({
//       state: PropTypes.shape({}).isRequired,
//       toggle: PropTypes.func.isRequired,
//     }),
//     render: PropTypes.func.isRequired,
//   }

//   render() {
//     const { render, target, dialog } = this.props;

//     return render(dialog ? {
//       isOpen: dialog.isOpen(target),
//       toggleDialog: () => dialog.toggle(target)
//     } : {});
//   }
// }

// export default Subscribe({ dialog: DialogContainer })(Trigger);

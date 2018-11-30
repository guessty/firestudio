import * as React from 'react'
// import ReduxToastr from 'react-redux-toastr'
//
import StyledToastr from './StyledToastr'
import { subscribe } from '@store/store'

class Toastr extends React.Component {
  render() {
    return (
      <React.Fragment>
        <StyledToastr>
          {/* <ReduxToastr
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          /> */}
        </StyledToastr>
      </React.Fragment>
    )
  }
}

export default subscribe({ toastr: ToastrContainer })(Toastr)

import * as React from 'react'
import ReduxToastr from 'react-redux-toastr'
//
import StyledToastr from './StyledToastr'

export default () => (
  <React.Fragment>
    <StyledToastr>
      <ReduxToastr
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    </StyledToastr>
  </React.Fragment>
)

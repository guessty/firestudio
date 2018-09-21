import * as React from 'react'

interface IFirestudioErrorProps {
  statusCode: any
}

class FirestudioError extends React.Component<IFirestudioErrorProps> {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    const errorMessage = this.props.statusCode ?
      `An error ${this.props.statusCode} occurred on server` : 'An error occurred on client'
    return (
      <p>
        {errorMessage}
      </p>
    )
  }
}

export default FirestudioError

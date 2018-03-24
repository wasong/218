import React, { Fragment } from 'react'
import Button from 'material-ui/Button'
import Radium from 'radium'

const styles = {
  button: {
    height: 50,
    margin: '10px 0',
  },
}

const ActiveSession = ({ session, onEndSession }) => (
  <Fragment>
    <h2>Status: {session.active ? 'Active' : 'Inactive'}</h2>
    <div>{session.id}</div>
    <Button
      color="secondary"
      onClick={this.onEndSession}
      style={styles.button}
      fullWidth
    >
      Stop {session.id} Check In
    </Button>
  </Fragment>
)

export default Radium(ActiveSession)

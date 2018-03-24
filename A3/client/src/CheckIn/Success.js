import React, { Fragment } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Button from 'material-ui/Button'
import Radium from 'radium'

const Link = Radium(RouterLink)

const styles = {
  button: {
    height: 50,
    margin: '10px 0',
  },
  link: {
    textDecoration: 'none',
  },
}

const Success = ({ onClearCheckIn }) => (
  <Fragment>
    <h2>Thank you for checking in!</h2>
    <Link style={styles.link} to="/checkin">
      <Button
        color="secondary"
        onClick={onClearCheckIn}
        style={styles.button}
        fullWidth
      >
        Home
      </Button>
    </Link>
  </Fragment>
)

export default Radium(Success)

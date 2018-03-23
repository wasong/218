import React, { Component, Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Radium from 'radium'

const styles = {
  signIn: {
    height: 50,
    margin: '20px 0 10px',
  },
}

class Admin extends Component {
  state = {
    user: '',
    pass: '',
  }

  handleOnChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    return (
      <Fragment>
        <h2>-</h2>
        <TextField
          id="user"
          label="Username"
          value={this.state.user}
          onChange={this.handleOnChange('user')}
          fullWidth
        />
        <TextField
          id="pass"
          label="Password"
          type="password"
          value={this.state.pass}
          onChange={this.handleOnChange('pass')}
          fullWidth
        />
        <Button color="primary" style={styles.signIn} fullWidth>
          Sign In
        </Button>
      </Fragment>
    )
  }
}

export default Radium(Admin)

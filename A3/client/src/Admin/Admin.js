import React, { Component, Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Radium from 'radium'

import flex from 'styles/flex.css'

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
      </Fragment>
    )
  }
}

export default Radium(Admin)

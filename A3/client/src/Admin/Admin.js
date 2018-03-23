import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Radium from 'radium'

import { actions } from '../app.module'

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

  handleSignIn = () => {
    this.props.actions.adminSignIn(this.state.user, this.state.pass)
  }

  render() {
    const { signedIn, signedInError } = this.props

    if (signedIn) return 'Hey! You&#39re signed in already!'

    return (
      <Fragment>
        <h2>-</h2>
        <TextField
          id="user"
          label="Username"
          error={signedInError}
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
        <Button
          color="primary"
          onClick={this.handleSignIn}
          style={styles.signIn}
          fullWidth
        >
          Sign In
        </Button>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ app }) => ({
  signedIn: app.adminSignedIn,
  signedInError: app.adminSignedInError,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Admin))

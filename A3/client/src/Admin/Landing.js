import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Radium from 'radium'

import ActiveSession from './ActiveSession'
import { actions } from '../app.module'

const Link = Radium(RouterLink)

const styles = {
  button: {
    height: 50,
    margin: '10px 0',
  },
  error: {
    fontSize: 12,
    color: 'red',
    margin: '10px 0',
  },
  link: {
    textDecoration: 'none',
  },
}

class Landing extends Component {
  state = {
    id: '',
  }

  handleOnChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleCheckIn = () => {
    // TODO: check for active session before starting
    if (this.state.id !== '') {
      this.props.actions.startSession(this.state.id)
    }
  }

  handleCheckHistory = () => {
    if (this.state.id !== '') {
      this.props.actions.checkSession(this.state.id)
      this.props.onPush('/history')
    }
  }

  render() {
    const { actions, session } = this.props

    if (session.active) return <ActiveSession session={session} onEndSession={actions.endSession} />

    return (
      <Fragment>
        <h2>Admin</h2>
        <TextField
          id="id"
          label="Check In ID"
          value={this.state.id}
          onChange={this.handleOnChange('id')}
          fullWidth
        />
        <Button
          color="primary"
          onClick={this.handleCheckIn}
          style={styles.button}
          fullWidth
        >
          Start Check In
        </Button>
        <Button
          color="default"
          style={styles.button}
          onClick={this.handleCheckHistory}
          fullWidth
        >
          View History
        </Button>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ app }) => ({
  session: app.session,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Landing))

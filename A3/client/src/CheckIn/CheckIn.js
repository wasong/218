import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Radium from 'radium'

import Success from './Success'
import { actions } from '../app.module'

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
}

class CheckIn extends Component {
  state = {
    id: '',
    name: '',
    studentId: '',
  }

  handleOnChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    })
  }

  checkInputFields = () => {
    const { id, name, studentId } = this.state
    return id !== '' && name !== '' && studentId !== ''
  }

  handleCheckIn = () => {
    const { id, name, studentId } = this.state
    // TODO: check for active session before starting
    if (this.checkInputFields()) {
      this.props.actions.checkIn({
        id,
        name,
        studentId,
        date: new Date(),
      })
    }
  }

  render() {
    const { checkInSuccess, checkInError, actions } = this.props

    if (checkInSuccess) return <Success onClearCheckIn={actions.clearCheckin} />

    return (
      <Fragment>
        <h2>Check In</h2>
        <TextField
          id="id"
          label="Check In ID"
          value={this.state.id}
          onChange={this.handleOnChange('id')}
          fullWidth
        />
        <TextField
          id="name"
          label="Name"
          value={this.state.name}
          onChange={this.handleOnChange('name')}
          fullWidth
        />
        <TextField
          id="studentId"
          label="Student ID"
          value={this.state.studentId}
          onChange={this.handleOnChange('studentId')}
          fullWidth
        />
        <Button
          color="primary"
          onClick={this.handleCheckIn}
          style={styles.button}
          fullWidth
        >
          Check In
        </Button>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ app }) => ({
  checkInSuccess: app.checkInSuccess,
  checkInError: app.checkInError,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Radium(CheckIn))

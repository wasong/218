import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Radium from 'radium'

const styles = {
  root: {
    display: 'flex',
  },
}

class Login extends Component {
  state = {}

  componentDidMount = () => {
    this.handleOnLoad()
  }

  handleOnLoad = async () => {
    let data = await fetch(`${process.env.API}/`)
    data = await data.json()
    console.log(data)
  }

  render() {
    return (
      <div style={styles.root}>
        <div>Select</div>
        <div>Login</div>
      </div>
    )
  }
}

Login.propTypes = {}
Login.defaultProps = {}

export default Radium(Login)

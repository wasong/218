import React, { Component } from 'react'
import Radium from 'radium'

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
      <div>HOME</div>
    )
  }
}

Login.propTypes = {}
Login.defaultProps = {}

export default Radium(Login)

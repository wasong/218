import React, { Component } from 'react'
import Radium from 'radium'

class Home extends Component {
  state = {}

  componentDidMount = () => {
    this.handleOnLoad()
  }

  handleOnLoad = async () => {
    let data = await fetch(`${process.env.API}/hello`)
    data = await data.json()
    console.log(data)
  }

  render() {
    return (
      <div>HOME</div>
    )
  }
}

Home.propTypes = {}
Home.defaultProps = {}

export default Radium(Home)

import React, { Component } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Radium from 'radium'
import flex from 'styles/flex.css'

import Admin from './Admin'
import CheckIn from './CheckIn'

const styles = {
  root: {
    minHeight: '100vh',
  },
  section: {
    flex: 1,
  },
  pageLinksClass: `${flex.col} ${flex.justCenter} ${flex.alignCenter}`,
}

class Routes extends Component {
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
      <div style={styles.root} className={flex.flex}>
        <div style={styles.section} className={styles.pageLinksClass}>
          <Link to="/checkin">Check In</Link>
          <Link to="/login">Admin</Link>
        </div>
        <div style={styles.section}>
          <Switch>
            <Route exact path="/checkin" component={CheckIn} />
            <Route exact path="/login" component={Admin} />
            <Redirect to="/login" />
          </Switch>
        </div>
      </div>
    )
  }
}

Routes.propTypes = {}
Routes.defaultProps = {}

export default Radium(Routes)

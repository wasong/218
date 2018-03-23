import React, { Component } from 'react'
import { Switch, Route, NavLink as RouterLink, Redirect } from 'react-router-dom'
import Radium from 'radium'
import flex from 'styles/flex.css'

import Admin from './Admin'
import CheckIn from './CheckIn'

const NavLink = Radium(RouterLink)

const styles = {
  root: {
    minHeight: '100vh',
  },
  section: {
    flex: 1,
    padding: 50,
  },
  loginSection: {
    // '@media (max-width: 500px)': {
    //   flex: 2.5,
    // },
  },
  link: {
    fontSize: 20,
    fontWeight: 900,
    textDecoration: 'none',
    color: '#333',
    margin: '20px 0',
  },
  activeLink: {
    color: '#666',
  },
  sectionClass: `${flex.col} ${flex.justCenter} ${flex.alignCenter}`,
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
        <div style={styles.section} className={styles.sectionClass}>
          <NavLink style={styles.link} activeStyle={styles.activeLink} to="/login">Admin</NavLink>
          <NavLink style={styles.link} activeStyle={styles.activeLink} to="/checkin">Check In</NavLink>
        </div>
        <div style={[styles.section, styles.loginSection]} className={styles.sectionClass}>
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

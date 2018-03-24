import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link as RouterLink } from 'react-router-dom'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'
import Radium from 'radium'

import { actions } from '../app.module'

const Link = Radium(RouterLink)

const styles = {
  button: {
    height: 50,
    margin: '10px 0',
  },
  link: {
    textDecoration: 'none',
  },
}

class History extends Component {
  componentDidMount = () => {
    const { signedIn, history } = this.props

    if (!signedIn) history.push('/login')
  }

  render() {
    const { session } = this.props
    return (
      <Fragment>
        <h2>{session.id} Check Ins</h2>
        <List>
          {
            session.students.map(s => (
              <ListItem button>
                <ListItemText primary={s.name} />
              </ListItem>
            ))
          }
        </List>
        <Link style={styles.link} to="/login">
          <Button
            color="secondary"
            style={styles.button}
            fullWidth
          >
            Home
          </Button>
        </Link>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ app }) => ({
  session: app.session,
  signedIn: app.signedIn,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Radium(History))

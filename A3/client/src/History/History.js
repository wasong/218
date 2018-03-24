import React, { Fragment } from 'react'
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

const History = ({ session }) => (
  <Fragment>
    <h2>History</h2>
    <List>
      {
        session.students.map(s => (
          <ListItem button>
            <ListItemText primary={s.name} />
          </ListItem>
        ))
      }
    </List>
    <Link style={styles.link} to="/">
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

const mapStateToProps = ({ app }) => ({
  session: app.session,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Radium(History))

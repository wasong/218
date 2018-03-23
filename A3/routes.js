import { actions } from './mongo'

// export routes
const routes = (app) => {
  app.get('/', (req, res) => {
    res.send({ hi: 'Hello World' })
  })
}

export default routes

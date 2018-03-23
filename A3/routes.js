import { actions } from './mongo'

// export routes
const routes = (app) => {
  app.get('/', (req, res) => {
    res.send({ hi: 'Hello World' })
  })

  app.post('/start', (req, res) => {
    console.log(req.body)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.send({ hi: 'Hello World' })
  })
}

export default routes

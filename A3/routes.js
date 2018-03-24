import actions from './mongo'

// export routes
const routes = (app) => {
  app.get('/', (req, res) => {
    res.send({ hi: 'Hello World' })
  })

  app.post('/session', async (req, res) => {
    const { id } = req.body
    const session = await actions.getSession(id)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.send(session)
  })

  app.post('/start', async (req, res) => {
    const { id } = req.body
    const session = await actions.startSession(id)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.send(session)
  })
}

export default routes

import actions from './mongo'

// export routes
const routes = (app) => {
  app.get('/', (req, res) => {
    res.send({ hi: 'Hello World' })
  })

  app.post('/start', async (req, res) => {
    console.log(req.body)
    const { id } = req.body
    const session = await actions.startSession(id)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.send(session)
  })
}

export default routes

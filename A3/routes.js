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

  app.post('/end', async (req, res) => {
    const { id } = req.body
    const session = await actions.endSession(id)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.send(session)
  })

  app.post('/checkIn', async (req, res) => {
    const response = await actions.checkIn(req.body)
    console.log(response)
    if (!response) {
      res.header('Access-Control-Allow-Headers', 'Content-Type')
      res.send({ success: false, message: 'Something went wrong!' })
    } else {
      res.send({ success: true })
    }
  })

  app.get('/history', async (req, res) => {
    const history = await actions.getHistory()
    res.send(history)
  })
}

export default routes

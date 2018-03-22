// export routes
const routes = (app) => {
  app.get('/hello', (req, res) => {
    res.send({ hi: 'Hello World' })
  })
}

export default routes

'use strict'

const http = require('http')
const routes = require('./routes.js')

const PORT = 28966
const server = http.createServer()

server.on('request', (req, res) => routes.handler(req, res))

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

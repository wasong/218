// entry point for application
import express from 'express'
import bodyParser from 'body-parser'
// import mongoose from 'mongoose'

import routes from './routes'

const port = process.env.PORT || 9000
const app = express()

// app setup

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// middleware setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

// db setup
// mongoose.connect('mongodb://localhost:db/db')

routes(app)

app.listen(port, (req, res) => {
  console.log('Listening on port: ', port)
})

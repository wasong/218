const fs = require('fs')
const path = require('path')
const qs = require('querystring');

const formPage = fs.readFileSync(path.join(__dirname, 'form.html'))
const formScript = fs.readFileSync(path.join(__dirname, 'form.js'))

const handleGET = (req, res) => {
  if (req.url === '/form.js') res.end(formScript)
  if (req.url === '/') res.end(formPage)
}

const handlePOST = (req, res) => {
  if (req.url === '/') {
    let body = ''
    req.on('data', (data) => {
      body += data
    })

    req.on('end', () => {
      const post = qs.parse(body)
      console.log(post)
      res.end(formPage)
    })
  }
}

exports.handler = (req, res) => {
  switch (req.method) {
    case 'GET':
      handleGET(req, res)
      break;
    case 'POST':
      handlePOST(req, res)
      break
    default:
      res.end(formPage)
  }
}

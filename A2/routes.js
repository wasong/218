const fs = require('fs')
const path = require('path')
const qs = require('querystring');

const formPage = fs.readFileSync(path.join(__dirname, 'form.html'))
const formStyles = fs.readFileSync(path.join(__dirname, 'form.css'))
const formScript = fs.readFileSync(path.join(__dirname, 'form.js'))

const handleGET = (req, res) => {
  switch (req.url) {
    case '/form.js':
      res.writeHead(200, {"Content-Type": "application/javascript"})
      res.write(formScript)
      res.end()
      return
    case '/form.css':
    res.writeHead(200, {"Content-Type": "text/css"})
      res.write(formStyles)
      res.end()
      return
    case '/':
    res.writeHead(200, {"Content-Type": "text/html"})
      res.write(formPage)
      res.end()
      return
    default:
      res.write(formPage)
      res.end()
  }
}

const handlePOST = (req, res) => {
  if (req.url === '/') {
    let body = ''
    req.on('data', (data) => {
      body += data
    })

    req.on('end', () => {
      console.log(body)
      res.end(JSON.stringify({ hi: 'hi' }))
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

const fs = require('fs')
const path = require('path')
const qs = require('querystring');

const formPage = fs.readFileSync(path.join(__dirname, 'form.html'))
const formStyles = fs.readFileSync(path.join(__dirname, 'form.css'))
const formScript = fs.readFileSync(path.join(__dirname, 'form.js'))

const sendFile = (contentType, file, res) => {
  res.writeHead(200, { "Content-Type": contentType })
  res.write(file)
  res.end()
}

const handleGET = (req, res) => {
  switch (req.url) {
    case '/form.js':
      sendFile("application/javascript", formScript, res)
      return
    case '/form.css':
      sendFile("text/css", formStyles, res)
      return
    case '/':
      sendFile("text/html", formPage, res)
      return
    default:
      sendFile("text/html", formPage, res)
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

const fs = require('fs')
const path = require('path')
const qs = require('querystring');

const formPage = fs.readFileSync(path.join(__dirname, 'form.html'))
const formStyles = fs.readFileSync(path.join(__dirname, 'form.css'))
const formScript = fs.readFileSync(path.join(__dirname, 'form.js'))

const sendFile = (statusCode = 200, contentType, file, res) => {
  res.writeHead(statusCode, { "Content-Type": contentType })
  res.write(file)
  res.end()
}

const handleGET = (req, res) => {
  switch (req.url) {
    case '/form.js':
      sendFile(200, "application/javascript", formScript, res)
      return
    case '/form.css':
      sendFile(200, "text/css", formStyles, res)
      return
    case '/':
      sendFile(200, "text/html", formPage, res)
      return
    default:
      sendFile(200, "text/html", formPage, res)
  }
}

const handlePOST = (req, res) => {
  switch(req.url) {
    case '/':
      const writeToFile = (data) => {
        const files = fs.readdirSync(path.join(__dirname, 'data'))
        const fileName = files.find(elem => elem === 'user.json')
        if (fileName === undefined) {
          // make file
          try {
            fs.writeFileSync(
              path.join(__dirname, 'data', 'user.json'),
              data
            )
          } catch (err) {
            console.log(err)
          }
        } else {
          // read file and parse it
          const fileContents = fs.readFileSync(path.join(__dirname, 'data', fileName))
          console.log(JSON.parse(fileContents.toString()))
        }
      }

      req.on('data', writeToFile)
      req.on('end', () => res.end(JSON.stringify({ statusCode: 200, message: 'success' })))
      return
    default:
      req.on('end', () => res.end(JSON.stringify({ statusCode: 200, message: 'success' })))
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

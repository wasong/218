'use strict'

const fs = require('fs')
const path = require('path')
const qs = require('querystring');

// important file paths
const usersJSONPath = path.join(__dirname, 'data', 'users.json')

const formPage = fs.readFileSync(path.join(__dirname, 'form.html'))
const formStyles = fs.readFileSync(path.join(__dirname, 'form.css'))
const formScript = fs.readFileSync(path.join(__dirname, 'form.js'))
const usersPage = fs.readFileSync(path.join(__dirname, 'users.html'))
const usersScript = fs.readFileSync(path.join(__dirname, 'users.js'))
const usersJSON = (() => {
  let fileContents = { lastUser: 0 }
  try {
    fileContents = fs.readFileSync(usersJSONPath)
  } catch (err) {
    fs.writeFileSync(usersJSONPath, JSON.stringify(fileContents))
  }
  return fileContents
})()

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
    case '/data/users.json':
      sendFile(200, "application/javascript", usersJSON, res)
      return
    case '/users.html':
      sendFile(200, "text/html", usersPage, res)
      return
    case '/users.js':
      sendFile(200, "application/javascript", usersScript, res)
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
        // steps
        // try to read file
        // successful: parse contents, append new users starting from lastUser, write to file
        // failed: create new file and write the body to the new file
        let parsedFile = { lastUser: 0 }
        let parsedBody = JSON.parse(data.toString())

        try {
          const fileContents = fs.readFileSync(usersJSONPath)
          parsedFile = JSON.parse(fileContents.toString())
        } catch (err) {
          console.log(err)
        }

        const newFile = {}
        let newID = parsedFile.lastUser + 1
        parsedBody.ids.forEach((id, index) => {
          newID += index
          const user = Object.assign(
            {},
            parsedBody[id],
            { id: newID }
          )
          Object.assign(newFile, parsedFile, { [newID]: user })
        })
        newFile.lastUser = newID
        // console.log('parsedBody', parsedBody)
        // console.log('newFile', newFile)

        fs.writeFileSync(usersJSONPath, JSON.stringify(newFile))
      }

      req.on('data', writeToFile)
      req.on('end', () => res.end(JSON.stringify({ statusCode: 200, message: 'success' })))
      return
    case '/clear':
      try {
        fs.writeFileSync(usersJSONPath, JSON.stringify({ lastUser: 0 }))
      } catch (err) {
        res.end(JSON.stringify({ statusCode: 500, message: 'Server Error: Could not empty json' }))
      }
      res.end(JSON.stringify({ statusCode: 200, message: 'success' }))
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

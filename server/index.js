const http = require('http')
const { PORT = 8000 } = process.env

const fs = require('fs')
const path = require('path')
const PUBLIC_DIRECTORY = path.join(process.cwd(), 'public')

function loadStaticFile(fileName) {
    const getFile = path.join(PUBLIC_DIRECTORY, fileName)
    const file = fs.readFileSync(getFile)
    
    return file
}

function onRequest(req, res) {
  if(req.url == '/') {
    res.writeHead(200)
    res.end(loadStaticFile('index.html'))
  } else if(req.url == '/example') {
    res.writeHead(200)
    res.end(loadStaticFile('index.example.html'))
  } else if(req.url == '/cars') {
    res.writeHead(200)
    res.end(loadStaticFile('cars.html'))
  } else {
    if(req.url.includes('.css')) {
      res.writeHead(200)
      res.end(loadStaticFile(req.url))
    } else if(req.url.includes('.js')) {
      res.writeHead(200)
      res.end(loadStaticFile(req.url))
    } else if(req.url.includes('.jpg')) {
      res.setHeader('Content-Type','image/jpeg')
      res.writeHead(200)
      res.end(loadStaticFile(req.url), 'binary')
    }
  }
}

const server = http.createServer(onRequest)

server.listen(PORT, 'localhost', () => {
  console.log(`Server sudah berjalan, Silahkan buka http://localhost:${PORT}/` )
})
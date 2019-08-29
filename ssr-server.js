const express = require('express')
const next = require('next')
const path = require('path');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    // server.get('/about', (req, res) => {
    //   console.log('hitting here')
    //   const actualPage = '/help'
    //   app.render(req, res, actualPage)
    // })

    server.get('/manifest.json', (req, res) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
      res.sendFile(path.join(__dirname, './static', 'manifest.json'));
    });

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })

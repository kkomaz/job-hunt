const express = require('express')
const expressWS = require('express-ws');
const next = require('next')
const path = require('path');
const bodyParser = require('body-parser');
const secure = require('express-force-https');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const { setup } = require('radiks-server');

app.prepare()
  .then(() => {
    const server = express()
    server.use(secure);
    server.use(bodyParser.json());

    expressWS(server);

    setup({
      mongoDBUrl: 'mongodb://job-hunt-dev:jobhunting1@ds359077.mlab.com:59077/job-hunt-dev'
    }).then((RadiksController) => {
      server.use('/radiks', RadiksController)
    })

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

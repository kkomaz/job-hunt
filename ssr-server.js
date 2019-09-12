const express = require('express')
const expressWS = require('express-ws');
const next = require('next')
const path = require('path');
const bodyParser = require('body-parser');
const cookiesMiddleware = require('universal-cookie-express');
const secure = require('express-force-https');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const { setup } = require('radiks-server');
const makeApiController = require('./ApiController');

// Job Aggregators
const { decorateApp } = require('@awaitjs/express');
const { COLLECTION } = require('radiks-server/app/lib/constants');
const aggregateJobs = require('./aggregators/aggregateJobs');
const aggregateJob = require('./aggregators/aggregateJob');

app.prepare()
  .then(async () => {
    const server = express()
    server.use(cookiesMiddleware());
    server.use(secure);
    server.use(bodyParser.json());

    expressWS(server);

    const RadiksController = await setup({
      mongoDBUrl: 'mongodb://job-hunt-dev:jobhunting1@ds359077.mlab.com:59077/job-hunt-dev',
    });

    const radiksData = RadiksController.DB.collection(COLLECTION);
    
    server.use('/radiks', RadiksController);

    server.get('/jobs/new', (req, res) => {
      const actualPage = '/jobs/new'
      app.render(req, res, actualPage)
    })

    server.get('/jobs/:_id', (req, res) => {
      const actualPage = '/jobs/_id'
      app.render(req, res, actualPage)
    })

    server.get('/manifest.json', (req, res) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
      res.sendFile(path.join(__dirname, './static', 'manifest.json'));
    });

    server.get('/api/jobs', async(req, res) => {
      let jobs = await aggregateJobs(radiksData, req.query)
      res.json({ jobs })
    })

    server.get('/api/jobs/:_id', async(req, res) => {
      const job = await aggregateJob(radiksData, req);
      res.json({ job })
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

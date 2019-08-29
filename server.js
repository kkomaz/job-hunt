const express = require('express');
const next = require('next');
const path = require('path');
const { join } = require('path');
const expressWS = require('express-ws');
const secure = require('express-force-https');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const port = parseInt(process.env.PORT, 10) || 4000;

app.prepare().then(async () => {
  const server = express();
  server.use(secure);
  server.use(bodyParser.json());

  expressWS(server);

  server.get('/manifest.json', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.sendFile(path.join(__dirname, '..', 'static', 'manifest.json'));
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
})

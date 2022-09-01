const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const serverID = uuidv4();

app.get('/', (req, res) => {
  res.setHeader('X-scs-server', serverID);
  res.send(`
    <h1>Hello from this NodeJS app!!!!!</h1>
    <p>Try sending a request to /error and see what happens</p>
  `);
});

app.get('/error', (req, res) => {
  process.exit(1);
});

app.listen(8080, '0.0.0.0');

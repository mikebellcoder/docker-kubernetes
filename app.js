const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const serverID = uuidv4();
const port = process.env.PORT || 8080;

// provide point of abstraction for logging
const logger = console;

app.on('logger', (arg) => {
  logger.log(`This server received a request to ${arg.route.path} path!!!`);
  logger.log(`This is the request headers as JSON.stringified w/newlines: \n${JSON.stringify(arg.headers, null, 4)}`);
});

app.use('/angular', express.static(`${__dirname}/ng-app/dist/ng-app`));

app.get('/', (req, res) => {
  // fire logging event
  app.emit('logger', req);
  // respond
  res.setHeader('X-scs-server', serverID);
  res.send(`
    <h1>Hello from this NodeJS app!!!!!</h1>
    <p>Try sending a request to /error and see what happens</p>
  `);
});

app.get('/error', (req, res) => {
  process.exit(1);
});

app.listen(port, '0.0.0.0', () => {
  logger.log(`server listing on port ${port}`);
});

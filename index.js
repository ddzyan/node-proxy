const express = require('express');
const app = express();
const http = require('http');

const { startJob } = require('./common/schedule');
const settings = require('./common/settings');
const proxyWeb = require('./proxyWeb');
const { routeFilter, initRouter } = require('./common/utils');

initRouter();
startJob();
app.use((req, res, next) => {
  let logMsg = `${req.method.toUpperCase()}:${req.protocol}://${req.get(
    'Host'
  )}${req.originalUrl} --> `;

  const route = settings.getRoutes().find(routeFilter(req));

  if (!route) {
    logMsg += '无匹配路由规则';
    console.info(logMsg, req);
    next();
    return;
  } else {
    proxyWeb({
      req,
      res,
      server: route,
      logMsg,
    });
  }
});

app.use((req, res) => {
  console.warn(
    `${req.method.toUpperCase()}: ${req.protocol}://${req.get('Host')}${
      req.originalUrl
    } 404 Not Found!`,
    req
  );
  res.sendStatus(404);
});

const server = http.createServer(app);

server.listen(3000);

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
});

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

process.on('uncaughtException', (error) => {
  console.log('uncaughtException :', error);
  try {
    const killTime = setTimeout(() => {
      process.exit(1);
    }, 10 * 1000);
    server.close((err) => {
      if (err) {
        throw err;
      } else {
        killTime.unref();
      }
    });
    if (cluster.worker) {
      cluster.worker.disconnect();
    }
  } catch (err) {
    console.log(error);
    process.exit(1);
  }
});

module.exports = server;

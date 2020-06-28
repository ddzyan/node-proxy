const path = require('path');
const config = require('../config');
const settings = require('./settings');

exports.routeFilter = (req) => {
  return (item) => {
    let reqPath = req.path;
    let uri = item.uri;

    if (!path.extname(reqPath) && reqPath.substr(-1) !== '/') {
      reqPath = `${reqPath}/`;
    }

    if (!path.extname(uri) && uri.substr(-1) !== '/') {
      uri = `${uri}/`;
    }

    return reqPath.startsWith(uri);
  };
};

exports.initRouter = () => {
  settings.setRoutes(config.route);
};

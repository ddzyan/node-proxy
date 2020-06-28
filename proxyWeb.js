const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
  preserveHeaderKeyCase: true,
  proxyTimeout: 60000,
});

proxy.on('error', (err, req, res) => {
  if (req) {
    console.error(
      `Proxy Server Error! URL: ${req.protocol}://${req.get('Host')}${
        req.originalUrl
      } Error: ${err.message}`,
      req
    );

    res.sendStatus(500);
  } else {
    console.error(`Proxy Server Error! Error: ${err.message}`);
  }
});

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomItem(list, weight) {
  // 必须是非空且数量一致的数组
  if (
    Array.isArray(list) &&
    Array.isArray(weight) &&
    list.length > 0 &&
    list.length === weight.length
  ) {
    // 权重数组必须都是数字
    if (weight.every((t) => typeof t === 'number')) {
      const totalWeight = weight.reduce((prev, cur) => {
        return prev + cur;
      });

      const randomNum = rand(0, totalWeight);
      let weightSum = 0;

      for (let i = 0; i < list.length; i++) {
        weightSum += weight[i];
        if (randomNum <= weightSum) {
          return list[i];
        }
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}

function proxyWeb({ req, res, server, ctx, logMsg }) {
  if (server) {
    logMsg += `转发至${server.name}`;
    const { addresses } = server;
    if (addresses && Array.isArray(addresses) && addresses.length > 0) {
      const list = [];
      const weight = [];
      addresses.forEach((t) => {
        if (t.status) {
          list.push(t.address);
        }
      });
      addresses.forEach((t) => {
        if (t.status) {
          weight.push(Number(t.weight));
        }
      });
      const proxyAddress = getRandomItem(list, weight, req);

      // 如果没有获取到随机服务器，说明配置异常
      if (!proxyAddress) {
        logMsg += ` --> 错误：list或weight数据格式不正确！list: ${JSON.stringify(
          list
        )} weight: ${JSON.stringify(weight)}`;
        console.error(logMsg, req);
        res.sendStatus(500);
        return;
      }
      logMsg += ` (host: ${proxyAddress})`;
      setImmediate(() => {
        console.info(logMsg, req);
      });

      // 进行转发
      proxy.web(req, res, { target: proxyAddress });
    } else {
      logMsg += ' --> 错误：服务器配置异常！';
      console.error(logMsg, req);
      res.sendStatus(500);
    }
  } else {
    logMsg += '错误：未找到服务器';
    console.error(logMsg, req);
    res.sendStatus(500);
  }
}

module.exports = proxyWeb;

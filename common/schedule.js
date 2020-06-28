const schedule = require('node-schedule');
const axios = require('axios');

const settings = require('./settings');

const checkSettings = () => {
  console.log('checkSettings');
  const routes = settings.getRoutes();
  if (routes && Array.isArray(routes) && routes.length > 0) {
    for (const route of routes) {
      const { addresses } = route;
      for (const addresseObj of addresses) {
        const { checkUrl } = addresseObj;
        axios.get(checkUrl).catch(function (error) {
          addresseObj.status = false;
        });
      }
    }
  }
};
const startJob = () => {
  checkSettings();
  // 每隔5秒钟监测代理的服务器是否正常
  schedule.scheduleJob('*/5 * * * * *', () => {
    checkSettings();
  });
};
exports.startJob = startJob;

module.exports = {
  route: [
    {
      addresses: [
        {
          address: 'http://127.0.0.1:3001',
          weight: 30,
          checkUrl: 'http://127.0.0.1:3001/check',
          status: true,
        },
        {
          address: 'http://127.0.0.1:3002',
          weight: 70,
          checkUrl: 'http://127.0.0.1:3002/check',
          status: true,
        },
      ],
      name: 'service1',
      uri: '/eth',
    },
  ],
};

const routes = require('./routes/routes');

const config = {
  migrate: false,
  routes,
  port: process.env.PORT || '3000',
};

module.exports = config;

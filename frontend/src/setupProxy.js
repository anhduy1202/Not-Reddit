
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1/auth',
    createProxyMiddleware({
      target: 'https://reddat.onrender.com',
      changeOrigin: true,
    })
  );
};
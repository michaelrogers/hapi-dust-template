'use strict';

const Hapi = require('hapi');
const Path = require('path');
const inProd = process.env.NODE_ENV == 'production';

// Handle process failure
process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});
// configure server
const server = Hapi.server({
  port: 3000,
  host: 'localhost',
  router: {
    stripTrailingSlash: true
  }
});

const setRoutes = require('./routes');
const registerPlugins = require('./plugins');

module.exports = async () => {

  await Promise.all ([
    registerPlugins(server),
    setRoutes(server)
  ]);
  const context = {
    sitename: 'Test Site'
  };

  // Configure templating
  await server.register(require('vision'));

  server.views({
    engines: { dust: require('hapi-dust') },
    relativeTo: Path.join(__dirname),
    path: './views',
    layoutPath: './views/layout',
    partialsPath: './views/partials',
    context: context
    // helpersPath: 'path/to/helpers',
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

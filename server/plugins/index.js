const inProd = process.env.NODE_ENV === 'production';

module.exports = async server => {

  const plugins = [

    require('inert'),

    { plugin: require('hapi-dev-errors'),
      options: {
        showErrors: !inProd,
        useYouch: false
      }
    },
    { plugin: require('hapi-pino'), //Logger for routes
      options: {
        prettyPrint: !inProd,
        logEvents: ['request-error']
      }
    },

  ];

  await server.register(plugins);

  server.ext('onRequest', (request, h) => {
    if (request.path == '/favicon.ico') {
      return h.continue;
    }
    const { path } = request;
    const method = request.method.toUpperCase();
    request.logger.info('%s: %s', method, path);
    // console.log('Info: ', method, path);
    return h.continue;
  });

  console.log('Info: Plugins registered');
};

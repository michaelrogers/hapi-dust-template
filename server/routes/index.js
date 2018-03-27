module.exports = async server => {

  // server.route({
  //   method: 'GET',
  //   path: '/',
  //   handler: (request, h) => 'Hello, world!'
  // });

  // Dust render example
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('layout/main')
  });

  // Serve static files
  server.route({
    method: 'GET',
    path: '/js/{file*}',
    handler: {
      directory: {
        path: 'public/js'
      }
    }
  });

  // Send static file example
  server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, h) => h.file('./public/hello.html')
  });

  // Dynamic route
  server.route({
    method: 'GET',
    path: '/test/{value}',
    handler: (request, h) => (`
      <div>Params: ${JSON.stringify(request.params)}</div>
      <div>Query: ${JSON.stringify(request.query)}</div>
    `)
  });

  server.route({
    method: 'GET',
    path: '/name/{name}',
    handler: (request, h) => (
      `Hello, ${encodeURIComponent(request.params.name)}!`)
  });

  console.log('Info: Routes setup');
};
const Hapi = require('hapi');

const server = new Hapi.Server({
  host:'localhost',
  port: 3000
});

//launch the server
const launch = async () => {
  try {
    await server.start();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${server.info.uri}`);
}

launch()

//building a basic route
server.route ({
  method: 'GET',
  path:'/',
  handler: (request, h) => {
    return "Hello World"
  }
})

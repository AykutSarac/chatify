const fastify = require('fastify')({ logger: false });
fastify.register(require('./routes/router'));

// CORS for REST API
fastify.register(require('fastify-cors'), { origin: true });

/**
 * Create WebSocket connection
 * see: https://github.com/fastify/fastify-websocket
 */
fastify.register(require('fastify-websocket'), {
  handle,
  options: {
    maxPayload: 1048576, // we set the maximum allowed messages size to 1 MiB (1024 bytes * 1024 bytes)
    clientTracking: true,
  },
});

function handle(conn) {
  conn.pipe(conn); // creates an echo server
}

// We're adding our websocket connection here to gather data
fastify.get('/', { websocket: true }, (connection, req) => {
  connection.socket.on('message', (data) => {
    try {
      fastify.websocketServer.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(data);
        }
      });
    } catch (error) {
      console.error(error);
    }
  });
});

const start = async () => {
  try {
    const PORT = process.env.PORT || 8080;
    await fastify.listen(PORT);

    console.log(`Server running at http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

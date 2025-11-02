const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const parsed = dotenv.parse(fs.readFileSync(envPath));
  for (const [k, v] of Object.entries(parsed)) {
    if (process.env[k] === undefined) process.env[k] = v;
  }
}
const Fastify = require('fastify');

function buildServer() {
  const fastify = Fastify({ logger: false });

  // Plugins
  fastify.register(require('@fastify/cors'), { origin: '*' });
  fastify.register(require('./models/db'));

  // Routes
  fastify.register(require('./routes'));

  return fastify;
}

if (require.main === module) {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const host = process.env.HOST || '0.0.0.0';
  const app = buildServer();
  app.listen({ port, host }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log('server connected to the port');
  });
}

module.exports = buildServer;

const { status } = require('../controllers/healthController');

module.exports = async function (fastify) {
  fastify.get('/', async () => ({ message: 'API is running' }));
  fastify.get('/health', status);
};

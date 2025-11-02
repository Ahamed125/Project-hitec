const { success } = require('../utils/response');

exports.status = async (request, reply) => {
  let db = 'unknown';
  try {
    // Simple lightweight check; will succeed if DB is reachable
    await request.server.db.query('SELECT 1');
    db = 'up';
  } catch (e) {
    db = 'down';
  }
  return success({ status: 'ok', db });
};

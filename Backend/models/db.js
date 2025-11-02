const fp = require('fastify-plugin');
const mysql = require('mysql2/promise');

async function dbPlugin(fastify) {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'appdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Try a lightweight ping without failing startup
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log('database connected');
  } catch (e) {
    console.log('database not connected');
  }

  fastify.decorate('db', pool);

  fastify.addHook('onClose', async (instance, done) => {
    try {
      await pool.end();
      done();
    } catch (err) {
      done();
    }
  });
}

module.exports = fp(dbPlugin);

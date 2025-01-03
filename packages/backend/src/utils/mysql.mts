import mysql from 'mysql2/promise';

function createMysqlPool() {
  console.log('host:', process.env.MYSQL_HOST);
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
  return pool;
}

const poolMap = new Map<'pool', mysql.Pool | null>();

const getPool = () => {
  if (!poolMap.get('pool')) {
    poolMap.set('pool', createMysqlPool());
  }
  return poolMap.get('pool');
};

export { createMysqlPool, getPool };

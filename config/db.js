const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testing',
    password: 'office123',
    port: 6000
  })
  module.exports = pool
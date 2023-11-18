const Pool = require('pg').Pool
const pool = new Pool({
    user: 'testing_mrls_user',
    host: 'dpg-cl6vlfo3632s73dq6umg-a',
    database: 'testing_mrls',
    password: 'ZgVAjupANQmZQSPLPckcpoeiayODThaW',
    port: 5432,
    ssl: true
  })
  module.exports = pool
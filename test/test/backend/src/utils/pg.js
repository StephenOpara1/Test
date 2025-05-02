//reuires pg
const {Pool} = require('pg');
const { database, password } = require('pg/lib/defaults.js');

const pool = new Pool({
    user:'me',
    host:'dpg-d0ac2o95pdvs73ckko10-a',
    database:'test2_rgnl',
    password:process.env.DATABASE_PASSWORD,
    port:'5432'
});

module.exports = pool;
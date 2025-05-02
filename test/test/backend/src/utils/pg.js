//reuires pg
const {Pool} = require('pg');
const { database, password } = require('pg/lib/defaults.js');

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'postgres',
    password:'imustgotoharvard11',
    port:'5432'
});

module.exports = pool;
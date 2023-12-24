const{Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movies_database',
    password: 'kart0tuying',
    port: 5432
});

module.exports = pool; 
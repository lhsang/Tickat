var pg = require('pg');
pg.defaults.ssl = true;

var config = {
    user: 'yzmlwhuuljkjlf',
    database: 'dd89bh5kb99lg',
    password: '5f0ef9e6aa0eaf21dc1b6f846d5e286c8149b6ad50adf84ed787f66e5fdf0886',
    host: 'ec2-174-129-208-118.compute-1.amazonaws.com',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
}
module.exports = new pg.Pool(config);


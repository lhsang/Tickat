const Sequelize = require('sequelize');

module.exports = new Sequelize({

    //db local
    /*database: 'postgres',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,*/

    //db online
    database: 'dd89bh5kb99lg',
    username: 'yzmlwhuuljkjlf',
    password: '5f0ef9e6aa0eaf21dc1b6f846d5e286c8149b6ad50adf84ed787f66e5fdf0886',
    host: 'ec2-174-129-208-118.compute-1.amazonaws.com',
    port: 5432,
    
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    },
    define:{
        freezeTableName: true,
        timestamps: false
    },
    pool: {
        max: 20,
        min: 0,
        idle: 5000
    }
});

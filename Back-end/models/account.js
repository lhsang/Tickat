const Sequelize = require('sequelize');
const sequelize = require('../configs/db');

//Sequelize Associations at ../configs/db.js

class Account extends Sequelize.Model {}
Account.init({
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING,
    full_name: Sequelize.STRING,
    address: Sequelize.STRING,
    date_of_birth: Sequelize.DATE,
    tel: Sequelize.STRING,
    mail: Sequelize.STRING,
    description: Sequelize.STRING,
    role_id: Sequelize.INTEGER
}, { sequelize, modelName: 'account' });

module.exports = Account;
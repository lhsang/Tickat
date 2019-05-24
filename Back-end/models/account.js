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
    tel: {
        type: Sequelize.STRING,
        isNumeric: true
    },
    mail: Sequelize.STRING,
    description: {
        type:Sequelize.STRING,
        defaultValue: "A litle about me ..."
    },
    role_id: {
        type: Sequelize.INTEGER,
        defaultValue: 2
    }
    
}, { sequelize, modelName: 'account' });

module.exports = Account;
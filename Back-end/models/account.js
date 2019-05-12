const Sequelize = require('sequelize');
const sequelize = require('../configs/db');
const Role = require('../models/role');

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
    email: Sequelize.STRING,
    description: Sequelize.STRING,
}, { sequelize, modelName: 'account' });

//Account.belongsTo(Role,{foreignKey: 'role_id'});

module.exports = Account;
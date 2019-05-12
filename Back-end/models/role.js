const Sequelize = require('sequelize');
const sequelize = require('../configs/db');
const Account = require('../models/account');

class Role extends Sequelize.Model {}
Role.init({
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    }
}, { sequelize, modelName: 'role' });

//Role.hasMany(Account,{as: 'accounts', foreignKey: 'role_id'});

module.exports = Role;
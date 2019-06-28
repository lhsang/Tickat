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
    date_of_birth: Sequelize.DATEONLY,
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
    },
    avatar:{
        type: Sequelize.STRING,
        defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHrfXM02tYxPsrVLqi2G9JsddmYU2ord-0Q0j4kkzn05a38Z7H"
    }
    
}, { sequelize, modelName: 'account' });

module.exports = Account;
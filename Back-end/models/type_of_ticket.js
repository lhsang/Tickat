const Sequelize = require('sequelize');
const sequelize = require('../configs/db');

//Sequelize Associations at ../configs/db.js

class TypeTicket extends Sequelize.Model {}
TypeTicket.init({
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    }
}, { sequelize, modelName: 'type_of_ticket' });

module.exports = TypeTicket;
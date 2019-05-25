const Sequelize = require('sequelize');
const sequelize = require('../configs/db');

//Sequelize Associations at ../configs/db.js

class Ticket extends Sequelize.Model {}
Ticket.init({
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    price: {
        type:Sequelize.INTEGER,
        defaultValue: 0
    },
    amount: {
        type:Sequelize.INTEGER,
        defaultValue: 10
    },
    bought: {
        type:Sequelize.INTEGER,
        defaultValue: 0
    },
    description: Sequelize.STRING,
    event_id: {
        type:Sequelize.INTEGER,
        allowNull: false
    },
    type_id: Sequelize.INTEGER
}, { sequelize, modelName: 'ticket' });

module.exports = Ticket;
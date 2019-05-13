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
    price: Sequelize.INTEGER,
    amount: Sequelize.INTEGER,
    bought: Sequelize.INTEGER,
    description: Sequelize.STRING,
    event_id: Sequelize.INTEGER,
    type_id: Sequelize.INTEGER
}, { sequelize, modelName: 'ticket' });

module.exports = Ticket;
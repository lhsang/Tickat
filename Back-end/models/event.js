const Sequelize = require('sequelize');
const sequelize = require('../configs/db');

//Sequelize Associations at ../configs/db.js

class Event extends Sequelize.Model {}
Event.init({
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    created_at: Sequelize.DATE,
    date: Sequelize.DATE,
    description: Sequelize.STRING,
    address: Sequelize.STRING,
    img: Sequelize.STRING,
    organization_id: Sequelize.INTEGER,
    category_id: Sequelize.INTEGER
}, { sequelize, modelName: 'event' });

module.exports = Event;
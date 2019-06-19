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
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    description: Sequelize.STRING,
    address: Sequelize.STRING,
    img: Sequelize.STRING,
    organization_id: Sequelize.INTEGER,
    category_id: Sequelize.INTEGER,
    date_arr: Sequelize.VIRTUAL,
    bought: Sequelize.VIRTUAL
}, { sequelize, modelName: 'event'});

module.exports = Event;
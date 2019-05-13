const Sequelize = require('sequelize');
const sequelize = require('../configs/db');

//Sequelize Associations at ../configs/db.js

class Organization extends Sequelize.Model {}
Organization.init({
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    tel: Sequelize.STRING,
    mail: Sequelize.STRING,
    website: Sequelize.STRING,
    img: Sequelize.STRING,
    description: Sequelize.STRING
}, { sequelize, modelName: 'organization' });

module.exports = Organization;
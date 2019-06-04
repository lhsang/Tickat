const Sequelize = require('sequelize');
const sequelize = require('../configs/db');

//Sequelize Associations at ../configs/db.js

class Order extends Sequelize.Model {}
Order.init({
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    event_id: {
        type:Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING,
        isNumeric: true
    },

    mail: Sequelize.STRING,

    address: Sequelize.STRING,
    
    user_id:{
        type: Sequelize.INTEGER
    },

    date_bought: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    },
   
}, { sequelize, modelName: 'order'});


module.exports = Order;
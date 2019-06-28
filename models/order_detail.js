const Sequelize = require('sequelize');
const sequelize = require('../configs/db');

//Sequelize Associations at ../configs/db.js

class Order_detail extends Sequelize.Model {}
Order_detail.init({
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    order_id: {
        type:Sequelize.INTEGER,
        allowNull: false
    },

    ticket_id: {
        type:Sequelize.INTEGER,
        allowNull: false
    },

    amount:{
        type:Sequelize.INTEGER,
        allowNull: false
    }
   
}, { sequelize, modelName: 'order_detail'});



module.exports = Order_detail;
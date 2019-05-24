const Sequelize = require('sequelize');
const sequelize = require('../configs/db');

//Sequelize Associations at ../configs/db.js

class Category extends Sequelize.Model {}
Category.init({
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    img:{
        type: Sequelize.STRING,
        defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'
    }
}, { sequelize, modelName: 'category' });

module.exports = Category;
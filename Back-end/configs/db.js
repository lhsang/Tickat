const Sequelize = require('sequelize');
module.exports = new Sequelize({

    //db local
    /*database: 'postgres',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,*/

    //db online
    database: 'dd89bh5kb99lg',
    username: 'yzmlwhuuljkjlf',
    password: '5f0ef9e6aa0eaf21dc1b6f846d5e286c8149b6ad50adf84ed787f66e5fdf0886',
    host: 'ec2-174-129-208-118.compute-1.amazonaws.com',
    port: 5432,
    
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    },
    define:{
        freezeTableName: true,
        timestamps: false
    },
    pool: {
        max: 20,
        min: 0,
        idle: 5000
    }
});

//associations
const  Role = require('../models/role');
const Account = require('../models/account');
const Organization = require('../models/organization');
const Event = require('../models/event');
const Category = require('../models/category');
const TypeTicket = require('../models/type_of_ticket');
const Ticket = require('../models/ticket');

Role.hasMany(Account,{
    foreignKey: 'role_id'        
});
Account.belongsTo(Role,{
    foreignKey: 'role_id'
});

Organization.hasMany(Event, {
    foreignKey: 'organization_id'
});
Event.belongsTo(Organization,{
    foreignKey: 'organization_id'
});

Category.hasMany(Event, {
    foreignKey: 'category_id'
});
Event.belongsTo(Category, {
    foreignKey: 'category_id'
});

Event.hasMany(Ticket, {
    foreignKey: 'event_id'
});
Ticket.belongsTo(Event, {
    foreignkey: 'event_id'
});

TypeTicket.hasMany(Ticket, {
    foreignKey: 'type_id'
});
Ticket.belongsTo(TypeTicket, {
    foreignKey: 'type_id'
});



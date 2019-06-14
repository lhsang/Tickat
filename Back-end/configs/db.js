const Sequelize = require('sequelize');
module.exports = new Sequelize({

    //db local
    // database: 'tickat',
    // username: 'postgres',
    // password: 'postgres',
    // host: 'localhost',
    // port: 5432,

    //db online
    database: 'dfupui3khqo4iv',
    username: 'rfzwrublzspbie',
    password: '8c540ca8fec2d570a70982e29e83b5254f68e1fb321ba492944e6119555335f3',
    host: 'ec2-23-21-148-223.compute-1.amazonaws.com',
    port: 5432, 
    
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    },
    define:{
        freezeTableName: true,
        timestamps: false,
        underscored: true
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
const Order = require('../models/order');
const Order_detail = require('../models/order_detail');

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
Account.hasMany(Organization,{
    foreignKey: 'user_id'
});
Organization.belongsTo(Account, {
    foreignKey: 'user_id'
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

Event.hasMany(Order,{
    foreignKey: 'event_id'
})

Ticket.belongsTo(Event, {
    foreignkey: 'event_id'
});

TypeTicket.hasMany(Ticket, {
    foreignKey: 'type_id'
});
Ticket.belongsTo(TypeTicket, {
    foreignKey: 'type_id'
});

Ticket.hasMany(Order_detail,{
    foreignKey: 'ticket_id' 
});

Order.belongsTo(Event,{
    foreignKey: 'event_id' 
});

Order.hasMany(Order_detail,{
    foreignKey: 'order_id'
});

Order_detail.belongsTo(Order,{
    foreignKey: 'order_id'
});

Order_detail.belongsTo(Ticket,{
    foreignKey: 'ticket_id' 
})




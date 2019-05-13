const db = require('../configs/db');
const  Role = require('../models/role');
const Account = require('../models/account');
const Organization = require('../models/organization');
const Event = require('../models/event');
const Category = require('../models/category');
const TypeTicket = require('../models/type_of_ticket');
const Ticket = require('../models/ticket');

Role.findAll({
    include: {
        model: Account
    }
}).then(result => console.log(JSON.stringify(result)));
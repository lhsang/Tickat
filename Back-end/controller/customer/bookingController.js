var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');
var ticketService = require('../../service/ticketService');

function handleTickets(tickets){
    var className = ['vip','normal','free'];

    tickets.forEach((element,index) => {
        element.remaining = element.amount - element.bought;
        element.className = className[index];
    });
}

exports.bookingPage = async (req, res)=>{
    var categories = await categoryService.getAllCategories();
    var id = req.params.event_id;
    var tickets = await ticketService.getTicketsByEventId(id);

    handleTickets(tickets);

    res.render("customer/booking",{
        title: 'Thông tin vé - Tickat: Mua bán vé sự kiện',
        layout: 'main',
        categories:  categories,
        tickets: tickets
    });
};

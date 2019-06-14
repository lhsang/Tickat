const db = require('../configs/db');
const  Role = require('../models/role');
const Account = require('../models/account');
const Organization = require('../models/organization');
const Event = require('../models/event');
const Category = require('../models/category');

const Order_detail = require('../models/order_detail');

const TypeTicket = require('../models/type_of_ticket');
const Ticket = require('../models/ticket');


const bcrypt = require('../utils/bcrypt');
const eventService = require('../service/eventService');
const ticketService = require('../service/ticketService');
const organizationService = require('../service/organizationService');
const userService =  require('../service/userService');
const {getDateObjectFromString} = require('../utils/format');

const fs = require('fs');
const object_define = require('../utils/object_define');

// Order_detail.findAll({
//    include:{
//        model: Ticket
//     }
// }).then(result => console.log(JSON.stringify(result)));


// Role.findAll({
//     include: {
//         model: Account
//     }
// }).then(result => console.log(JSON.stringify(result)));

// Category.bulkCreate([
//     {name:'Âm nhạc'},
//     {name: 'Thể thao'},
//     {name: 'Game'},
//     {name: 'Kinh doanh'}
// ]).then(result=>console.log(JSON.stringify(result)));


// Organization.bulkCreate([
//     {
//         name: 'COCOBAY ĐÀ NẴNG', tel: '084 287 2326', 
//         mail: 'contact@cocobay.com', website: 'cocobay.com',
//         img: 'https://dichvuthuexedanang.com/wp-content/uploads/2018/08/Review-Cocobay-Da-Nang-5.jpg',
//         description: `Tọa lạc ở vị trí trung tâm du lịch Đà Nẵng - Hội An, tổ hợp Du lịch và Giải trí Cocobay như một viên ngọc tuyệt mỹ nổi bật giữa khung cảnh nên thơ của biển trời Đà Nẵng. Với tổng diện tích 31 ha bao gồm bãi biển xanh ngát trải dài 600m thơ mộng, Cocobay mang đến những trải nghiệm chưa từng có về du lịch, lưu trú, giải trí và là biểu tượng mới của phong cách sống thời thượng.
//         Cocobay được định hướng tập trung cung cấp mô hình dịch vụ hoàn chỉnh "Lưu Trú Tiện Nghi - Giải Trí Tuyệt Vời - Tham Quan Thả Ga - Ẩm Thực Đa Dạng".
//         - Chuỗi khách sạn Boutique cùng các căn hộ Condotels độc đáo mang đến trải nghiệm lưu trú thú
//         vị. 
//         - Các hoạt động giải trí đẳng cấp và diễn ra quanh năm hứa hẹn giúp du khách có những giây phút
//         thư giãn trong không khí lễ hội tưng bừng mỗi khi đến tới Cocobay.
//         - Chuỗi nhà hàng với lựa chọn đa dạng cùng phố đi bộ ẩm thực chắc chắn sẽ giúp các tín đồ ẩm thực
//         thỏa thích khám phá. 
//         - Coco Bus Tour - xe buýt 2 tầng đầu tiên tại Việt Nam - sẽ đưa du khách đến các điểm du lịch nổi
//         tiếng tại Đà Nẵng.
//         `
//     },
//     {
//         name: `TRUNG TÂM VĂN HÓA PHÁP TẠI HÀ NỘI-L'ESPACE' `, tel: '038.3927.4473', 
//         mail: 'contact@ttvhphn.com', website: 'ttvhphn.com',
//         img: 'https://tkbvn-tokyo.s3.amazonaws.com/Upload/organizerlogo/2018/08/23/CD2B1E.jpg',
//         description: `Trung tâm Văn hóa Pháp tại Hà Nội – L’Espace là nơi giao lưu gặp gỡ về ngôn ngữ, văn hóa Pháp và các nước Pháp ngữ. Đây là trung tâm giảng dạy tiếng Pháp và là một trong những địa chỉ quen thuộc của đời sống văn hóa nghệ thuật Hà Nội.
//         `
//     },
// ]);

// Event.bulkCreate([
//     {
//         name:'AQUA LEAGUE',
//         date: '2019-08-01 14:00:00',
//         description: `Nhập code 'VIPCODE12' nhận ngay ưu đãi giảm 12% cho gói COUPLE và gói NHÓM

//         AQUA LEAGUE - LỄ HỘI NƯỚC ĐỈNH CAO ĐÃ SẴN SÀNG 
        
//         Lần đầu tiên, một lễ hội nước với concept độc đáo, quy mô tầm cỡ và các hoạt động giải trí đúng CHẤT sẽ xuất hiện tại Cocobay Đà Nẵng mùa hè này.
        
//         Aqua League hứa hẹn thổi bay sức nóng mùa hè này bằng hàng loạt những điểm nhấn cực kỳ thú vị có 1-0-2.
        
//         Với concept “đại chiến nước” thú vị của #AquaLeague, khán giả tham dự chương trình sẽ được thử nghiệm những trò chơi thể thao nước QUY MÔ KHỦNG chưa từng thấy.
        
//         💦 Thoả sức mình trong các trò chơi nước độc đáo được đầu tư khủng như pháo đài nước, đường trượt nước, đường trượt xà phòng, cây cầu nước, máy phun bọt xà phòng, vòi rồng phun nước cỡ lớn.
        
//         💦 Tham gia vào cuộc “đại chiến team” cực lớn đầy phấn khích
        
//         💦 Thưởng thức những set nhạc cực bốc từ các DJs xuyên suốt cả ngày
        
//         💦 Tận hưởng những màn biểu diễn dance bốc lửa tại cả hai sân khấu phụ và chính
        
//         VÀ ĐẶC BIỆT HƠN CẢ 
        
//         Dàn line-up Việt - Hàn nóng hừng hực xuyên suốt cả 2 ngày lễ hội. Đặc biệt, sự xuất hiện của JAY PARK và DJ PUMKIN ngày 14/7 sẽ đem đến những phút giây đắm mình trong âm nhạc cuồng nhiệt
//         Concept ĐẠI CHIẾN TEAM không khoan nhượng được DJ và NGHỆ SỸ “cầm trịch”
//         Nghệ sĩ tham gia biểu diễn: 
//         .`,
//         organization_id: 1,
//         img: 'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/05/27/0C7BA8.jpg',
//         category_id: 1,
//         address:`Cocobay Đà Nẵng
//         Đường Trường Sa, phường Hòa Hải, Quận Ngũ Hành Sơn, Thành Phố Đà Nẵng`
//     }
// ])

//console.log(bcrypt.check_password('12s3','$2b$10$/x9N3JOMc1iWgCggymbwruxtHflo5FfF0zyJl3/UhR5n6U1VjcsrC'));


//console.log(Event.recomendationEvents());

// TypeTicket.bulkCreate([
//     {name:'Free'},
//     {name: 'Normal'},
//     {name: 'Free'}
// ]).then(result=>console.log(JSON.stringify(result)));

Ticket.bulkCreate([
    {event_id: 7,type_id: 1,price: 400000,amount:160,description:'Hàng ghế đầu, có chuẩn bị nước trà, bánh và được gởi tặng slide buổi hội thảo.'},
    {event_id: 7,type_id: 2,price: 140000,amount:50,description:'Hàng ghế giữa, có chuẩn bị nước suối.'},
    {event_id: 7,type_id: 3,price: 0,amount:30,description:'Các hàng ghế sau, không chuẩn bị nước uống'}
]).then(result=>console.log(JSON.stringify(result)));



// Order.bulkCreate([
//     {id:1,event_id:6,name:'Phan Minh Sơn',tel:'012345679',mail:'phanminhson@gmail.com',address:'132 đường số 1 quận Gò Vấp, TPHCM',user_id:null,date_bought: '2019-02-06 14:00:00'},
 
// ]).then(result=>console.log(JSON.stringify(result)));


// async function test(){
//     var events= await eventService.getAllEvents();
//     handleSuggestEvents(events);
// }

// function handleSuggestEvents(events){
//     var result = [];
//     var i =0, length = (events.length%2==0)? events.length : (events.length-1);
//     console.log(length);
    
//     for(i=0;i<length;i+=2){
//         result.push([events[i],events[i+1]]);
//     }
//     console.log(result);
// }

// test();

//console.log(object_define.getRoleIdDefined().admin);

var Order = require('../models/order');

// Order.findAll({
//      attributes:['date_bought'],
//         include: {
//             model: Order_detail,
//             attributes:['amount'],
//             include:{
//                 model: Ticket,
//                   attributes:['price'],
//                 include: {
//                     model: Event,
//                     attributes:['organization_id'],
//                     where:{organization_id :2}
//                 }
  
//             },
           
//         },
       

// }).then(result=>console.log(JSON.stringify(result)));


// Organization.findAll({
//     attributes:['id'],
//     where:{
//         user_id:9
//     },
//     include:{
//         model: Event,
//         attributes:['organization_id'],
//         include:{
//             model:Ticket,
//             attributes:['price'],
//             include:{
//                 model: Order_detail,
//                 attributes:['amount'],
//                 include:{
//                     model: Order,
//                     attributes:['date_bought']
//                 }
//             }
//         }
//     }
// }).then(result=>console.log(JSON.stringify(result)));

const sequelize = require('../configs/db');


Event.findAll({
   attributes:[],
    include:{
        model: Ticket,
        attributes: ['id','amount','bought','event_id',[sequelize.fn('COUNT', sequelize.col('tickets.amount')), 'sum']]
    },
    where: {
        organization_id:3
    },
    group: ['tickets.event_id']
}).then(result=>console.log(JSON.stringify(result)));

// ticket = Ticket.findAll({
//     attributes: [[sequelize.fn('sum', sequelize.col('price')), 'price']],
//     include: [{
//         model:Event,
//         where:{organization_id:3},
//     }
//     ],          
//      group:['event.id'],
// }).then(result=>console.log(JSON.stringify(result)));


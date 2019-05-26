const db = require('../configs/db');
const  Role = require('../models/role');
const Account = require('../models/account');
const Organization = require('../models/organization');
const Event = require('../models/event');
const Category = require('../models/category');
const TypeTicket = require('../models/type_of_ticket');
const Ticket = require('../models/ticket');
const bcrypt = require('../utils/bcrypt');
const eventService = require('../service/eventService');
const ticketService = require('../service/ticketService');

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
//         name: 'Confexhub Sdn. Bhd', tel: '084 727 4736', 
//         mail: 'vietnammeetup@gmail.com', website: 'confexhub.com.vn',
//         img: 'http://www.newmaker.com/u/2016/20167/com_img/Confexhub-logo.png',
//         description: 'Confexhub is a leading thought leader network solutions provider focuses on delivering industry economic and policy studies, global business and investment matching, as well as innovative business and investment conferences, exhibitions, forums and trainings in the ASEAN, SAARC and EEU regions.'
//     },
//     {
//         name: 'Orion', tel: '028.3827.4173', 
//         mail: 'contact@orion.com', website: 'orion.com',
//         img: 'http://images1.cafef.vn/Images/Uploaded/DuLieuDownload/LogoCorpLarge/ORION.JPG',
//         description: 'Orion được biết đến là một trong các công ty dẫn đầu thị trường bánh kẹo ở Việt Nam, với rất nhiều nhãn hàng được nhiều người biết đến như Choco.Pie, Custas, Goute…, hay các loại snack như O’star, Toonies, Marineboy, Swing… Với phương châm làm việc đặt chất lượng lên hàng đầu, Orion không ngừng nghiên cứu và phát triển nhiều sản phẩm mới vừa ngon miệng vừa có giá trị dinh dưỡng cao cho người tiêu dùng ở mọi lứa tuổi.'
//     },
// ]);

// Event.bulkCreate([
//     {
//         name:'Rock’n’Share – Hoa Lư Rực Lửa',
//         date: '2019-06-19 17:00:00',
//         description: `Quỹ #VìTụiNhỏ được thành lập bởi Psychotramps13 từ năm 2015, nhằm giúp đỡ các trẻ em vùng cao có hoàn cảnh khó khăn, thiếu thốn.
//         Toàn bộ số tiền bán vé và gây guỹ được từ các sản phẩm và đêm nhạc sẽ chuyển thành những nụ cười và ánh mắt này của Tụi Nhỏ, được chuyển đi bởi những gã lang thang trên những con xe, vượt đường xa, nắng gió, để trao tận tay Tụi Nhỏ.
//         Để từ đó, tiếp thêm năng lượng cho anh em Psychotramps13 tiếp tục cuộc hành trình Rock'n'Share và rồi để lại đi buôn hạnh phúc.`,
//         organization_id: 2,
//         img: 'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/05/18/0568AC.jpg',
//         category_id: 3,
//         address: `Sân Vận Động Hoa Lư
//         Số 2 Đinh Tiên Hoàng, Quận 1, Thành Phố Hồ Chí Minh`
//     },
//     {
//         name:'ĐÊM NHẠC BEETHOVEN VÀ RACHMANINOV',
//         date: '2019-07-28 08:00:00',
//         description: `Bản concerto cho piano số 2 cung Đô thứ của S. Rachmaninov được xem là một trong số ít những tác phẩm đặc biệt nổi tiếng của thời kỳ âm nhạc Lãng mạn. Tác phẩm được yêu mến khắp nơi trên thế giới, được mọi nghệ sĩ piano tài năng trên thế giới yêu thích lựa chọn để thể hiện tài năng của mình và âm nhạc của tác phẩm đã ảnh hưởng rộng khắp đời sống nghệ thuật đến tận ngày nay, xuất hiện trong hàng chục bộ phim nổi tiếng, là nguồn cảm hứng cho hàng trăm tác phẩm nghệ thuật khác như múa, kịch, hòa tấu, ca khúc, chương trình truyền hình … Tác phẩm này sẽ được trình diễn bởi nghệ sĩ piano xuất sắc Bích Trà cùng Dàn nhạc Giao hưởng HBSO trong Đêm nhạc Beethoven và Rachmaninov.

//         Với âm nhạc của thiên tài vĩ đại Ludwig van Beethoven, chúng ta sẽ có cơ hội thưởng thức Bản giao hưởng số 7 cung La trưởng, tác phẩm được Beethoven tự đánh giá là "Một trong những tác phẩm tốt nhất của tôi". Một tác phẩm gây chấn động ngay từ lần ra mắt đầu tiên năm 1813 tại Vienna, tác phẩm còn được biết đến với tên gọi "Anh hùng ca" (Eroica).
        
//         Chương trình được dàn dựng và chỉ huy bởi nhạc trưởng, NSUT Trần Vương Thạch.`,
//         organization_id: 1,
//         img: 'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/04/22/93BEBC.jpg',
//         category_id: 1,
//         address:'7 Công Trường Lam Sơn, phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh'
//     }
// ])

//console.log(bcrypt.check_password('12s3','$2b$10$/x9N3JOMc1iWgCggymbwruxtHflo5FfF0zyJl3/UhR5n6U1VjcsrC'));


//console.log(Event.recomendationEvents());

// TypeTicket.bulkCreate([
//     {name:'Free'},
//     {name: 'Normal'},
//     {name: 'Free'}
// ]).then(result=>console.log(JSON.stringify(result)));

// Ticket.bulkCreate([
//     {event_id: 3,type_id: 1,price: 500000,amount:60,description:'Hàng ghế đầu, có chuẩn bị nước trà, bánh và được gởi tặng slide buổi hội thảo.'},
//     {event_id: 3,type_id: 2,price: 200000,amount:100,description:'Hàng ghế giữa, có chuẩn bị nước suối.'},
//     {event_id: 3,type_id: 3,price: 0,amount:40,description:'Các hàng ghế sau, không chuẩn bị nước uống'},
//     {event_id: 2,type_id: 1,price: 600000,amount:40,description:'Hàng ghế đầu, có chuẩn bị nước trà, bánh và được gởi tặng slide buổi hội thảo.'},
//     {event_id: 2,type_id: 2,price: 300000,amount:70,description:'Hàng ghế giữa, có chuẩn bị nước suối.'},
//     {event_id: 2,type_id: 3,price: 0,amount:10,description:'Các hàng ghế sau, không chuẩn bị nước uống'},
//     {event_id: 1,type_id: 1,price: 1500000,amount:60,description:'Hàng ghế đầu, có chuẩn bị nước trà, bánh và được gởi tặng slide buổi hội thảo.'},
//     {event_id: 1,type_id: 2,price: 700000,amount:100,description:'Hàng ghế giữa, có chuẩn bị nước suối.'},
//     {event_id: 1,type_id: 3,price: 0,amount:30,description:'Các hàng ghế sau, không chuẩn bị nước uống'},
//     {event_id: 4,type_id: 1,price: 300000,amount:160,description:'Hàng ghế đầu, có chuẩn bị nước trà, bánh và được gởi tặng slide buổi hội thảo.'},
//     {event_id: 4,type_id: 2,price: 100000,amount:200,description:'Hàng ghế giữa, có chuẩn bị nước suối.'},
//     {event_id: 4,type_id: 3,price: 0,amount:0,description:'Các hàng ghế sau, không chuẩn bị nước uống'},
//     {event_id: 5,type_id: 1,price: 450000,amount:80,description:'Hàng ghế đầu, có chuẩn bị nước trà, bánh và được gởi tặng slide buổi hội thảo.'},
//     {event_id: 5,type_id: 2,price: 150000,amount:200,description:'Hàng ghế giữa, có chuẩn bị nước suối.'},
//     {event_id: 5,type_id: 3,price: 0,amount:70,description:'Các hàng ghế sau, không chuẩn bị nước uống'},
//     {event_id: 6,type_id: 1,price: 350000,amount:20,description:'Hàng ghế đầu, có chuẩn bị nước trà, bánh và được gởi tặng slide buổi hội thảo.'},
//     {event_id: 6,type_id: 2,price: 200000,amount:110,description:'Hàng ghế giữa, có chuẩn bị nước suối.'},
//     {event_id: 6,type_id: 3,price: 0,amount:40,description:'Các hàng ghế sau, không chuẩn bị nước uống'},
// ]).then(result=>console.log(JSON.stringify(result)));

function handleTicket(tickets){
    var className = ['vip','normal','free'];

    for(var i=0;i<tickets.length;i++)
        tickets[i].className = className[i];
}
async function test(){
    var tickets = await ticketService.getTicketsByEventId(3);
    tickets[0].m ="11";
    console.log(tickets);
}

test();
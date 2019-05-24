const db = require('../configs/db');
const  Role = require('../models/role');
const Account = require('../models/account');
const Organization = require('../models/organization');
const Event = require('../models/event');
const Category = require('../models/category');
const TypeTicket = require('../models/type_of_ticket');
const Ticket = require('../models/ticket');
const bcrypt = require('../utils/bcrypt');

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

/*Event.bulkCreate([
    {
        name:'ELECTRIFYING VIETNAM THROUGH SUSTAINABLE ENERGY PLANS',
        date: '2019-06-18 14:00:00',
        description: 'According to the revised Power Development Plan (PDP 7), Vietnam requires total investment of $143.5 billion (excluding privately financed BOT power generation projects) for meeting its double-digital annual growth of energy in demand. The Vietnam government is broadening their strategic approaches to fully tap the huge potential of its energy sector by unlocking private investment potentials; inviting foreign technical expertise and foreign investment for participation in its energy projects. It is estimated that Vietnam requires investment of 15billion per year, which 75% is earmarked for generation and 25% for development of the transmission and distribution network. \n'
        +'The hosting of the Electrify Vietnam 2019 (EVN2019) is to provide an interactive platform for potential investors and key players of the industry from over 25 countries to get updated on the new directions, investment policies and market potential of the energy and power sector in Vietnam; at the same time discuss strategies and share insights to support the National Power Development Plan in order to fulfill the demand of 515Twh in 2030.',
        address: 'Rex Hotel 141 Nguyễn Huệ Ho Chi Minh, ho chi minh ',
        organization_id: 1,
        img: 'https://tkbvn-tokyo.s3.amazonaws.com/static-page/landingpages/ravolution-music-festival-arise/images/section-1-banner/banner@4x.jpg?v=3',
        category_id: 2
    },
    {
        name:'ĐẠI NHẠC HỘI HỮU NGHỊ VIỆT HÀN | WE*FRIEND CONCERT IN VIET NAM 2019',
        date: '2019-04-28 18:00:00',
        description: 'Đại nhạc hội hữu nghị Việt - Hàn là hoạt động giao lưu văn hóa thường kỳ, không chỉ mang đến những màn biểu diễn nghệ thuật truyền thống đặc trưng mà còn quy tụ dàn nghệ sĩ nổi tiếng của cả hai nước. Mỗi năm BTC sẽ mời các ngôi sao nổi tiếng Kpop biểu diễn với mục đích tiếp nối tinh thần hội nhập quốc tế \n Chương trình có sự tham gia của 5 ngôi sao nổi tiếng Hàn Quốc: Bi Rain, nhóm Mamamoo, SF9, Pentagon,N.Flying và 2 nghệ sỹ Việt Nam: Tóc Tiên và Noo Phước Thịnh.',
        address: 'Sân Vận Động Quốc Gia Mỹ Đình Đường Lê Đức Thọ, Mỹ Đình, Quận Nam Từ Liêm, Thành Phố Hà Nội',
        organization_id: 1,
        img: 'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/04/22/AAA9EE.jpg',
        category_id: 2
    }
])
*/

//console.log(bcrypt.check_password('12s3','$2b$10$/x9N3JOMc1iWgCggymbwruxtHflo5FfF0zyJl3/UhR5n6U1VjcsrC'));


console.log(Event.recomendationEvents());


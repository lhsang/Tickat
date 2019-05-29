var object_define = require('./object_define');

exports.getDateObjectFromString = (str)=>{
    var today = new Date(str);

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var mm_en = object_define.getMonthInEnglish(parseInt(mm));
    
    return {
        dd: dd,
        mm: mm,
        mm_en: mm_en,
        yyyy: yyyy
    };
};
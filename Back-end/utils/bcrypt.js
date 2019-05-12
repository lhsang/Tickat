const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = Hash = {
    hash_password: function(myPlaintextPassword){
        return bcrypt.hashSync(myPlaintextPassword, saltRounds);
    },
    check_password: function(myPlaintextPassword, hash){
        return bcrypt.compareSync(myPlaintextPassword, hash);
    }
};

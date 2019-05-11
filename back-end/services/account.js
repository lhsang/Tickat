var pool = require('../configs/db');

function AccountService(){
    this.getAllAccount = getAllAccount;
}

function getAllAccount() {
    pool.connect(function(err, client, done){
        if(err) {
            console.log(err);
        }
        client.query('SELECT * FROM account', function (err, result) {
            done();
            res.send(result.rows);
        });
    });
}
class Account {
    constructor(){
        this.username = "guest";
        this.password = "not_define";
        this.full_name = "";
        this.address = "";
        this.date_of_birth = null;
        this.created_at = new Date();
        this.tel = "";
        this.mail  = "";
        this.role_id = 2;
        this.description = "";
    }

    clone(obj) {
        obj && Object.assign(this, obj);
    }
}

module.exports = Account;
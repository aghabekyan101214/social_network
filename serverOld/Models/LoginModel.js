const BaseModel = require("./BaseModel");

class LoginModel extends BaseModel {
    constructor() {
        super('users');
    }
}

module.exports = new LoginModel();
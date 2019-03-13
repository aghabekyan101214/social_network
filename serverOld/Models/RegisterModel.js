var BaseModel = require("./BaseModel");
class RegisterModel extends BaseModel {
    constructor() {
        super('users');
    }
}

module.exports = new RegisterModel();
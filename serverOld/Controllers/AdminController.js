const UserModel = require("../Models/UserModel");
class AdminController {

    index(req, res) {
        let local = {
            data: 'tandz'
        }
        res.render('admin/index', local);
    }

    post(req, res) {
        console.log(req.body.name);
    }
}

module.exports = AdminController;
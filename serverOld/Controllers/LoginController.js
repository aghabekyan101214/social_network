const LoginModel = require("../Models/LoginModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class LoginController {
    index(req, res) {
        let local = {
            fields: {
                email: "",
            }
        }
        res.render('sign/login', local);
    }

    login (req, res) {
        if(req, req.body.email) {

        }
        LoginModel.where('email', req.body.email).then((r) => {
            if(r.length > 0) {
                bcrypt.compare(req.body.password, r[0].password).then(function(result) {
                    if (result) {
                        req.session.user = r[0];
                        res.redirect('/profile/' + r[0].id);
                    }
                });
            }
        });
    }
}

module.exports = LoginController;
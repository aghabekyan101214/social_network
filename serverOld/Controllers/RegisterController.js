var validator = require('validator');
var UserModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class RegisterController {
    index(req, res) {
        let local = {
            success: req.session.success,
            errors: req.session.validationErrors,
            fields: req.session.fields,
            uniqueEmailError: req.session.uniqueEmailError
        }
        res.render('sign/register', local);
        req.session.destroy();
    }

    register(req, res) {
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('surname', 'Surname is required').notEmpty();
        req.checkBody('email', 'Valid Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('pass', 'Password must be min five symbols').isLength({ min: 5 });
        req.checkBody('passwordConf', 'Passwords do not match').equals(req.body.pass);
        req.session.uniqueEmailError = "";
        var fields = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
        }
        var errors = req.validationErrors();
        if(errors) {
            res.json(errors);
        }
        else if(!errors && req.body.email){
            UserModel.checkEmail(req.body.email).then((result) => {
                //if current email is registered
                if(result == 1) {
                    req.session.fields = fields;
                    req.session.uniqueEmailError = "The Email Has Already Been Registered";
                    res.redirect('/register');
                }
                else{
                    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                        if(err) console.log(err);
                        var user = {
                            name: req.body.name,
                            surname: req.body.surname,
                            email: req.body.email,
                            password: hash,
                        }

                        RegisterModel.add(user)
                            .then(()=>{
                                req.session.success = "You are registered and may now login please.";
                                res.redirect("/login");
                            })
                            .catch((error) =>{
                                console.log(error);
                                res.redirect("/signup");
                            })
                    });
                }

            });
        }
    }
}

module.exports = RegisterController;
const UserModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class SigningController{
    register(req, res) {
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('surname', 'Surname is required').notEmpty();
        req.checkBody('email', 'Valid Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('pass', 'Password must be min five symbols').isLength({ min: 5 });
        req.checkBody('passwordConf', 'Passwords do not match').equals(req.body.pass);

        var errors = req.validationErrors();
        if(errors) {
            res.json(errors);
        }

        else if(!errors && req.body.email){
            UserModel.checkEmail(req.body.email).then((result) => {
                //if current email is registered
                if(result == 1) {
                    let data = [
                            {location: "body", param: "email", msg: "The Email Has Already Been Registered", value: ""}
                        ];
                    res.json(data);
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

                        UserModel.add(user)
                            .then(()=>{
                                res.json('1');
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

module.exports = SigningController;
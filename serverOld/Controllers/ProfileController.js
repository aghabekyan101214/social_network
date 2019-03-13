const UserModel = require("../Models/UserModel");

class ProfileController {
    index(req, res, id) {
        if(req.session.user && id) {

            if(req.session.user.id == id) {
                let local = {
                    user: req.session.user,
                }
                res.render('profile/index', local);
            }
            else {
                res.redirect('/profile/' + req.session.user.id);
            }
        }
        else{
            res.redirect('/login')
        }
    }

    getUsers(req, res) {
        if(req.body.data) {
            return new Promise((resolve, reject) => {
                UserModel.findOr(req.body.data, 'name', 'surname').then((r) => {
                    let local = {
                        layout: false,
                        data: r,
                    }
                    res.render('ajax/searchPeople', local);
                })
            })
        }
    }
}

module.exports = ProfileController;
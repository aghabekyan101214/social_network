const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./config/routes');
const cors = require('cors')
const app = express();
const expressValidator = require('express-validator');
const session = require('express-session');

app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 600000000 },
    saveUninitialized: true,
    resave: true,
}));
app.use(cors());
app.use(expressValidator());

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/404', function(req, res) {
    res.render('404');
});

app.all("*", function(req, res) {
    let url = req.url;
    let expl_url = url.split('/');
    let params = [];
    if (expl_url.length > 2) {
        url = "/" + expl_url[1];
        for(let i = 2; i < expl_url.length; i++) {
            params.push(expl_url[i]);
        }
    }
    let method = req.method;
    let route = routes.find(key => key.url == url && key.type == method);
    if(route) {
        let controller = require('./Controllers/' + route.controller);
        let obj = new controller();
        obj[route.method](req, res, ...params);
    }
    else{
        res.redirect('/404');
    }

});

app.listen(3000, function() {
    console.log('Server is Running');
});

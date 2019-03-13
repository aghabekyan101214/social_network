const routes = [
    {url: '/', controller: 'HomeController', method: 'index', type: "GET"},
    {url: '/register', controller: 'RegisterController', method: 'index', type: "GET"},
    {url: '/login', controller: 'LoginController', method: 'index', type: "GET"},
    {url: '/add-user', controller: 'RegisterController', method: 'addUser', type: "POST"},
    {url: '/login', controller: 'LoginController', method: 'index', type: "GET"},
    {url: '/check-login', controller: 'LoginController', method: 'login', type: "POST"},
                                //profile
    {url: '/profile', controller: 'ProfileController', method: 'index', type: "GET"},
    {url: '/get-users', controller: 'ProfileController', method: 'getUsers', type: "POST"},

];
module.exports = routes;

import VueRouter from 'vue-router';
import Login from '../components/signing/Login';
import Register from '../components/signing/Register'

export default new VueRouter({
    mode: 'history',
    routes: [
        {path: '/login', component: Login},
        {path: '/register', component: Register}
    ]
})
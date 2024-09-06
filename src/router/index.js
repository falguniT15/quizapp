import Vue from 'vue';
import Router from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import LoginSuccess from '../components/LoginSuccess.vue';
import HomePage from '../components/HomePage.vue';
import QuizPage from '../components/QuizPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: UserLogin },
    { path: '/success', component: LoginSuccess },
    { path: '/home', name: 'HomePage', component: HomePage },
    { path: '/quiz',name: 'QuizPage',component:QuizPage,props: true}
  ]
});

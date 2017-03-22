import Vue from 'vue';
import routes from './routes';
import App from './components/app.vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import 'whatwg-fetch';
// import 'notify.js'
Vue.use(Vuetify)
Vue.use(VueRouter);
const router = new VueRouter( { routes } );

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

import Vue from 'vue';
import VueResource from 'vue-resource';
import InfiniteScroll from 'vue-infinite-scroll';
import App from './App';

Vue.use(VueResource);
Vue.use(InfiniteScroll);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});

import Vue from 'vue'
import { Loadmore } from 'mint-ui';
import App from './inviteApp'

Vue.use(Loadmore);
window.parentV = new Vue({
  render: h => h(App)
}).$mount('#app')

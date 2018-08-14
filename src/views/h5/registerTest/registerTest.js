import Vue from 'vue'
import http from '../../../common/DMC.http'
import App from './registerTestAPP'
Vue.prototype.http = http;
new Vue({
    render: h => h(App)
  }).$mount('#app')
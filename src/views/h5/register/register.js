import Vue from 'vue'
import App from './registerApp'
import http from '../../../common/DMC.http'


Vue.prototype.http = http;

new Vue({
  render: h => h(App)
}).$mount('#app')

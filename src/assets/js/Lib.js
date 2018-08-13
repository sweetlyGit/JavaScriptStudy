require('assets/css/weui.min.css');
require('assets/css/common.css');

import Vue from 'vue';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// import M from './common';

import $ from './jquery-vendor';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './flexible.js';

//解决click点击300毫秒延时问题
import FastClick from 'fastclick';
FastClick.attach(document.body);	

export default{
	// M
}
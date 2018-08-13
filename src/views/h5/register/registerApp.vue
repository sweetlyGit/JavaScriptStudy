<template>
  <div class='register' v-cloak>
    <!-- 背景图片和文字 -->
    <div class='banner'>
      <img src="../../../assets/img/fyx_zc@2x.png" alt="广汽丰田"/>
    </div>
    <!-- /背景图片和文字 -->
    <!-- 表单 -->
    <div class='form'>
      <div class='form_row' style='margin-top:0.9rem;'>
        <div class="form_input">
          <img class='s_icon_phone' src="../../../assets/img/phone@2x.png">
          <input style='width: 7rem;' type='tel' v-model='json.phoneNumber' placeholder='请输入手机号'>
        </div>
      </div>
      <br />
      <div class='form_row'>
          <div class='form_input' style='margin-right: 110px; width:100%;'>
            <img class='s_icon_txt' src="../../../assets/img/code@2x.png">
            <input type='tel' v-model='json.checkCode' placeholder='请输入验证码'>
            <a @click='getCode' class='btn code no_radius' :class='{disabled:disabled}'>{{timer}}{{code}}</a>
          </div>
          
      </div>
      <br />
      <div class='form_row'>
        <a @click='verify' id='register' class="btn btn_blue btn-lg btn-block no_radius">立即体验</a>
      </div>
    <p class='txt'>
      <!-- <b>温馨提示:</b> -->
    点击"立即体验"代表已同意
    <a style=" text-decoration: underline" v-bind:href="'./protocol.html'">广汽丰田会员网络协议</a>
    <!-- {{txt1}}
        <a v-bind:href="'./protocol.html'">《广汽丰田会员网络协议》</a>
        {{txt2}} -->
    </p>
    </div>
    <!-- 图片滑块验证码 -->
    <div v-show='show' id='dialog'> </div>
    <div v-show='show' id='captcha'>
      <div id="captcha_div"></div> <!-- 验证码容器元素定义 -->
      <p v-if='error' class='warn'><i class="glyphicon glyphicon-remove-sign c_red"></i><span class='c_red'>验证失败</span><span style='color:#666'>&nbsp;拖动滑块将悬浮图案正确拼合</span></p>
      <p v-else class='warn'><i class=" glyphicon glyphicon-info-sign"></i>请滑动验证码</p>
      <div @click='cancel' class='center cancel'>取消</div>
    </div>
    <!-- /图片滑块验证码 -->
    <div id='allmap' style='display:none;'></div>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import u from 'assets/js/utils';
import md from 'assets/js/MD5';
import { MessageBox } from 'mint-ui';
import * as mock from '../register/mock/mock.data';

export default {
  data () {
      return {
        msg: 'register Vue',
        name: 'Reborn',
        json:{
          phoneNumber:'',
          checkCode:'',
          password:'',
          lat:'',
          lng:'',
          name:'',
        },
        timer:'',
        code:'获取验证码',
        isValidated:false,
        isNeedPic:false,
        disabled:false,
        t:'',
        show:false,
        error:false,
        // secretKey:'',
        // sendUrl:'',
        // regUrl:'',
        secretKey:'49ba1edb4a8411998bea46ef9828bef2',
        sendUrl:'https://carapptest.gtmc.com.cn/appservice/reg/action/AppUserRegisterAction/sendCheckCodeMessage.json',
        regUrl:'https://carapptest.gtmc.com.cn/appservice/reg/action/AppUserRegisterAction/registerAppUser.json',
        txt1:'未注册丰云行账号的手机号,点击马上体验将自动注册丰云行账号,且代表您同意与广汽丰田缔结',
        txt2:'承诺遵守其规定,并授权广汽丰田按照规定使用本人提供的个人信息。',
        NECaptchaValidate:''
      }
    },
  components: {},
  //实例初始化最之前，无法获取到data里的数据
  beforeCreate(){
      
      const apiList = [
          //获取注册验证码-post
          {"id":"sendInviteCheckCode","url":"sendInviteCheckCode.json","mock":mock['sendInviteCheckCode']},
          
          //被邀请用户注册-post
          {"id":"registerUserForInvite","url":"registerUserForInvite.json","mock":mock['registerUserForInvite']}

      ];
      //默认不开启，开启后读取本地模拟数据
      //this.http.setDebugger(true);
      
      this.http.setResponseFormat(false);

      //全局写入接口前缀域名
      this.http.setContentType('application/x-www-form-urlencoded;charset=utf-8');
      this.http.setDomainUrl("https://carapp.gtmc.com.cn/appservice/html/action/InviteRegisterForHtmlAction/");
      // this.http.setDomainUrl("https://carapptest.gtmc.com.cn/appservice/html/action/InviteRegisterForHtmlAction/");
      //this.http.setDomainUrl("http://localhost:8088/appservice/html/action/InviteRegisterForHtmlAction/");
      
      this.http.setMutiApi(apiList);
  	
  },  
  //在挂载开始之前被调用
  beforeMount(){
  	
  
  }, 
  //已成功挂载，相当ready()
  mounted(){
  },
  //相关操作事件
  methods:{
    foo() {
      //console.log('foo')
    },
    verify(){
        sa.track('BtnClick',{
            'button_content':'邀请注册_注册按钮'
        });
      // 校验
      if(u.isEmpty(this.json.phoneNumber)){
        this.s_alert('请输入手机号');
        return
      };
      if(!u.isPhone(this.json.phoneNumber)){
        this.s_alert('请输入正确的手机号');
        return
      };
      if(u.isEmpty(this.json.checkCode)){
        this.s_alert('请输入验证码');
        return
      };
      //开始注册
      this.register();

    },
    register(){
      //注册事件
      var _self = this;
      var registerData ={
          token:this.http.getQueryValue('token'),
          inviteePhone:_self.json.phoneNumber,
          checkCode:_self.json.checkCode,
          inviteCode:this.http.getQueryValue('inviteCode')
      }
       
      this.http.post('registerUserForInvite',registerData,(result)=>{
          if (result.resultCode == "1") {
              //MessageBox.alert('您的手机号已注册成功！').then(action => {
                  window.location = 'download.html';
              //});
          }else{
              _self.s_alert(result.errMsg)
          };
      })
    },
    getCode(){
      //获取验证码
      // 校验
      if(u.isEmpty(this.json.phoneNumber)){
        this.s_alert('请输入手机号');
        return
      };
      if(!u.isPhone(this.json.phoneNumber)){
        this.s_alert('请输入正确的手机号');
        return
      };
      this.sendVerifyCode(0);
    },
    s_alert(str){
      MessageBox({
          title: '提示',
          message: str,
          confirmButtonText: '关闭'
        });
    },
    sendVerifyCode(num){
      //滑动图片验证码
      var _self = this;
      if(this.isNeedPic && !this.isValidated){
        alert("您尚未完成滑动图片验证码！");
        return;
      }
      var CAPTCHA_DRAG_ID = "faa06ee0c4df4e03aefdccac1f73c21d",
      // var CAPTCHA_DRAG_ID = '52d67f80f83c4cfb87cf300e182254bb',
      CAPTCHA_WIDTH = $(window).width()*0.8;
      var options = {
          "element": "#captcha_div",
          "captchaId": CAPTCHA_DRAG_ID,
          "mode": "embed",                    //float,embed
          "width": CAPTCHA_WIDTH,
          "onVerify": function(err,ret) {
           
            if (!err) {
                _self.NECaptchaValidate = ret.validate;
                _self.isValidated = true;
                _self.isNeedPic = false;
              _self.error =false;
                _self.cancel();
                _self.sendVerifyCode(1);
//              MessageBox.alert('验证成功').then(action => {
//
//              });
            }else{
              _self.error =true;
            }
          }
      };
      var random = Math.floor(Math.random()*9000+1000);
      var date = new Date().getTime();
      var sign = md(md("phoneNumber="+this.json.phoneNumber+"randomNumber="+random+"time="+date)+this.secretKey);
      var data = {
          inviteePhone : this.json.phoneNumber,
          isValidated : this.isValidated?1:0,
          token:this.http.getQueryValue('token'),
          inviteCode:this.http.getQueryValue('inviteCode'),
          NECaptchaValidate: this.NECaptchaValidate
      };
        _self.doLoop();
      this.http.post('sendInviteCheckCode',data,(result)=>{
          if(result.resultCode == '1'){
              if(result.isExceed == '1'){
                  _self.show=true;
                  _self.isNeedPic = true;
                  initNECaptcha(options);
              } else {
                  _self.isNeedPic = false;
                  _self.isValidated = false;
                  $("#captcha_div").empty();
                  _self.s_alert("验证码发送成功！");
                  
              }
          } else {
              _self.isNeedPic = false;
              _self.isValidated = false;
              $("#captcha_div").empty();
              _self.s_alert(result['errMsg']);
          }
      })
      
    },
    wait(){
      //发送倒计时
      var _self =this;
      if (this.timer > 1) {
        this.timer--;
      }else{
        this.codeinit();
        clearInterval(_self.t)
      };
    },
    cancel(){
      //滑动验证码取消
      $("#captcha_div").empty();
      this.show = false;
        this.isNeedPic = false;
        this.error =false;
    },
    doLoop(){
      //执行倒计时
      var _self = this;
      $('.code').attr('disabled',true);
      this.code = '重新发送';
      this.timer = 59;
      this.disabled = true;
      this.t = setInterval(_self.wait, 1000);
    },
    codeinit(){
      //获取验证码按钮初始化
      this.code = '获取验证码';
      this.timer = '';
      this.disabled = false;
      $('.code').attr('disabled',false);
    },
    getLoaction(){
      // 百度地图API功能
      var _self = this;
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(116.331398,39.897445);
      map.centerAndZoom(point,12);
       
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
      var mk = new BMap.Marker(r.point);
      map.addOverlay(mk);
      map.panTo(r.point);
      _self.json.name = r.address.city;
      _self.json.lat = r.point.lat;
      _self.json.lng = r.point.lng;
      // console.info('您的位置：'+r.point.lng+','+r.point.lat);
      // console.info(_self.json);
      }
      else {
      alert('failed'+this.getStatus());
      }        
      },{enableHighAccuracy: true})
    }  
  }
}
</script>

<style scoped>
.register{
  width: 10rem;
  min-height: 100%;
  height: 18rem;
  position: relative;
  /*overflow: auto;*/
}
.banner{
  position: relative;
  width: 100%;
  /* height: 9.3rem; */
  color: #ccc;
  text-align: center;
  overflow: hidden;
  z-index: 1;
}
.banner img{
  width: 100%;
}
.form{
  /*height: 8.6rem;*/
  position: relative;
  width: 100%;
  z-index: 2;
  /*background: #fff;*/
}
.form_row{
  position: relative;
  margin:auto;
  width: 8.3rem;
}
.form_input{
  height: 1.12rem;
  line-height: 1.12rem;
  border: 1px solid #ccc;
  color: #C5C5C5;
  border-radius: 5px;
}
.form_input input{
  outline: none;
  border: none;
  padding-left: 2px;
  color: #666;
  margin-left: 0.8rem;
  line-height: 2.5;
  
}
.code{
  color: #6AC1FE;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  padding:0px;
  width: 2.4rem;
  line-height: 1.12rem;
  text-align: center;
}
#register{
  height: 1.13rem;
  line-height: 1.13rem;
  padding: 0;
}
.no_radius{
  border-radius: 0; 
}
.btn_blue{
  background:#00C9FF;
  color: #fff;
  border-radius: 5px;
}
.font_blue{
  color: #4F82FB;
}
.bottom{
  position: absolute;
  width: 100%;
  bottom: 0.1rem;
}
.txt{
    width: 8.7rem;
    margin: 1rem auto;
    margin-bottom: 0;
    font-size: 0.3rem;
    margin-bottom: 0.2rem;
    text-align: center;
}
.s_icon_phone,.s_icon_txt{
  width: 0.5rem;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0.28rem;
}
#captcha{
  width: 9rem;
  height: 8.8rem;
  background-color: #fff;
  position: absolute;
  top: 40%;
  left: 50%;
  margin-left: -4.5rem;
  margin-top: -3.3rem;
  z-index: 9;
  border-radius: 10px;
  padding-bottom: 50px;
  color: #4F82FB;
}
#captcha .cancel{
  height: 50px;
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: 50px;
  font-size: 16px;
  color: #4F82FB;
  font-weight: bolder;
}
#captcha .warn{
  position: absolute;
  bottom: 50px;
  padding-left: 0.5rem;
}
#captcha .cancel:before{
  content: '';
  position: absolute;
  border-bottom: 1px solid #ccc;
  width: 100%;
  height: 1px;
  left: 0;
  top: 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
#captcha_div{
  position: absolute;
  bottom: 80px;
  width: 100%;
}
#dialog{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 9;
}
.c_red{
  color: #00C9FF;
}


</style>

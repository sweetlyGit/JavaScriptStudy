<template>
  <div class="invite-wrap">
  <mt-loadmore :top-method="loadTop"  ref="loadmore">
    <div class='invite'>
      <img src="../../../assets/img/bg.png">

      <img alt="分享链接图标" style="display:none" src="../../../assets/img/appInviteShare.png">
      <!-- 分享方式 -->
      <div class='shareBox' style='position: relative;'>
        <div class="weui-flex center">
          <div class="weui-flex__item">
            <img @click='doAppShareAction(1)' src="../../../assets/img/pyq@2x.png">
            <p>朋友圈</p>
          </div>
          <div class="weui-flex__item">
            <img @click='doAppShareAction(2)' src="../../../assets/img/wx@2x.png">
            <p>微信</p>
          </div>
          <div class="weui-flex__item">
            <img @click='doAppShareAction(3)' src="../../../assets/img/ewm@2x.png">
            <p>二维码</p>
          </div>
          <div class="weui-flex__item">
            <img id='copy' @click='doAppShareAction(4)' src="../../../assets/img/fzlj@2x.png" data-clipboard-target="content">
            <p>复制链接</p>
          </div>
        </div>
      </div>
      <!-- 分享方式 -->
      <!-- tab -->
      <div class='tabBox'>
        <!-- <div class='tab'>
		  <div class='rules'>活动规则</div>
		  <div class='my_inite'>我的邀请</div>
		</div>
		<div ></div> -->
        <ul id="myTab" class="nav nav-tabs">
          <li class="fl" v-bind:class="{'active':people['total']==0}"><a href="#rules" data-toggle="tab">活动规则</a>
          </li>
          <li style='float:right;' v-bind:class="{'active':people['total']>0}"><a href="#my_invite" data-toggle="tab">我的邀请</a></li>
        </ul>
        <div id="myTabContent" class="tab-content" style='position: relative;'>
          <div class="tab-pane fade in" v-bind:class="{'active in':people['total']==0}" id="rules">
            <div class='weui-flex s_flow'>
              <div class="weui-flex__item s_img">
                <img src="../../../assets/img/fxzf@2x.png">
              </div>
              <div class="weui-flex__item d_img">
                <img src="../../../assets/img/_......-@2x.png">
              </div>
              <div class="weui-flex__item s_img">
                <img src="../../../assets/img/hyzc-@2x.png">
              </div>
              <div class="weui-flex__item d_img">
                <img src="../../../assets/img/_......-@2x.png">
              </div>
              <div class="weui-flex__item s_img">
                <img src="../../../assets/img/yhq@2x.png">
              </div>
            </div>
            <div class='weui-flex s_txt'>
              <div class="weui-flex__item" v-for='(item,index) in flows'>
                <div class='arrow'><p>{{index+1}}</p></div>
                <p class='fontb' style='color:#50668d;margin:0;'>{{item.txt1}}</p>
                <p class='fontb' style='color:#50668d;'>{{item.txt2}}</p>
              </div>
            </div>
            <!-- <div class='s_rules'>
              <p class='s_rule-txt'>
                <b>邀请奖励发放规则</b>
                <br />
                1.您每推荐一个好友注册，好友可以获得相应的奖励。
              </p>
            </div> -->
              <div class="rule">
                <h5>邀请规则</h5>
                <div>1.好友成功通过您分享的邀请链接完成注册，并首次登录丰云行App算作邀请成功。</div>
                <!-- <div>1、您每推荐一个好友注册，好友可以获得相应的奖励.</div> -->
              </div>

          </div>
          <div class="tab-pane fade" v-bind:class="{'active in':people['total']>0}" id="my_invite">
            <div class='s_box center'>
              <h4 class='fontb c_blue'>
                <div class="radius"><span>{{people['total']}}</span>人</div> 
                <small class='c_blue'>(已邀请好友)</small>
              </h4>
              <div class="rule">
                <h5>人数统计规则</h5>
                <div>您成功邀请好友注册丰云行并完成首次登录，该新用户会记录在您的邀请人数里。</div>
                <!-- <h5>邀请奖励发放规则</h5>
                <div>1、您每推荐一个好友注册，好友可以获得相应的奖励.</div> -->
              </div>
              <!-- <p>您成功邀请好友注册App并完成首次登录，<br/>该新用户会记录在您的邀请人数里。</p> -->
            </div>
            <ul v-if='list.length > 0' style='overflow:hidden; background:#F5FDFF;text-align: center;'>
              <li class='weui-flew fontb border_b' style='color:#1e548d;'>
                <div class='weui-flew__item'>
                  <div class='col-xs-4'><b>手机号</b></div>
                  <div class='col-xs-5'><b>首次登录时间</b></div>
                  <div class='col-xs-3'><b>进度</b></div>
                </div>
              </li>
              <li class='weui-flew border_b' v-for='(item,index) in list'>
                <div class='weui-flew__item'>
                  <div class='col-xs-4'><span class="font-blue nowrap">{{item.PHONE}}</span></div>
                  <div class='col-xs-5'><span class="font-blue nowrap">{{item.LOGIN_DATE}}</span></div>
                  <div class='col-xs-3'><span class="font-blue nowrap">{{item.PROGRESS}}</span></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- /tab -->
    </div>
  </mt-loadmore>
  </div>
</template>

<script>
import Lib from "assets/js/Lib";
import u from "assets/js/utils";
import * as mock from "../invite/mock/mock.invite";
import http from "../../../common/DMC.http";

let inviteApp = (window.inviteApp = {
  data() {
    return {
      msg: "invite Vue",
      name: "inviteApp",
      flows: [
        { txt1: "分享链接", txt2: "邀请好友" },
        { txt1: "好友注册", txt2: "邀请成功" },
        { txt1: "如有活动", txt2: "获得奖励" }
      ],
      people: { total: 0 },
      list: [],
      url: "",
      userid: "",
      allLoaded: false,
      shareParams: {
        inviteWay: "",
        inviteFrom: "1",
        organizationCode: "00000",
        activityId: 999999999
      },
      userInfo: {
        inviterPhone: ""
      }
    };
  },
  components: {},
  //实例初始化最之前，无法获取到data里的数据
  beforeCreate() {
    const apiList = [
      //获取邀请好友的数量和被邀请人的进度-post
      {
        id: "getMyInviteInfo",
        url: "getMyInviteInfo.json",
        mock: mock["getMyInviteInfo"]
      }
    ];
    //默认不开启，开启后读取本地模拟数据
    //http.setDebugger(true);

    http.setResponseFormat(false);

    //全局写入接口前缀域名
    http.setContentType("application/x-www-form-urlencoded;charset=utf-8");
    http.setDomainUrl("https://carapp.gtmc.com.cn/appservice/html/action/InviteRegisterForHtmlAction/");
    // http.setDomainUrl("https://carapptest.gtmc.com.cn/appservice/html/action/InviteRegisterForHtmlAction/");

    http.setMutiApi(apiList);
  },
  //在挂载开始之前被调用
  beforeMount() {},
  //已成功挂载，相当ready()
  mounted() {
    this.userid = u.GetUrl("userid");
    this.getUserInfoFromApp();
  },
  //相关操作事件
  methods: {
    loadTop() {
      // 加载更多数据
      this.getMyInviteInfo(window["userInfoCache"]);
      this.$refs.loadmore.onTopLoaded();
    },
    getUserInfoFromApp() {
      try {
        let _params = {
          interfaceName: "jsGetUserDetails",
          functionName: "doGetUserDetail",
          params: {}
        };
        let _strParams = JSON.stringify(_params);
        if (this.isIos()) {
          window.webkit.messageHandlers.NativeJavaScriptInterface.postMessage(
            _strParams
          );
        } else {
          window.NativeJavaScriptInterface.postMessage(_strParams);
        }
      } catch (e) {
        alert(e.message);
      }
    },
    getMyInviteInfo(_result) {
      let _resultInfo = _result["params"],
        _tel = "";
      if (
        _resultInfo.hasOwnProperty("resultCode") &&
        _resultInfo["resultCode"] == "1"
      ) {
        _tel = _resultInfo["userInfo"]["tel"];
      } else {
        alert(_resultInfo["errMsg"]);
        return !1;
      }

      let postParams = {
        token: http.getQueryValue("token"),
        inviterPhone: _tel
      };

      http.post("getMyInviteInfo", postParams, result => {
        //alert(JSON.stringify(result))
        //alert('调JAVA接口getMyInviteInfo---'+JSON.stringify(result));

        if (result["resultCode"] === "1") {
          parentV.$children[0]["people"]["total"] = result["total"];
          parentV.$children[0]["list"] = result["detail"];
          //return self;
        } else {
          alert(result["errMsg"]);
        }
      });
    },

    doAppShareAction(_type) {
      this.shareParams["inviteWay"] = _type;
      try {
        let _params = {
          interfaceName: "jsInviteRegistration",
          params: this.shareParams
        };
        let _strParams = JSON.stringify(_params);
        if (this.isIos()) {
          window.webkit.messageHandlers.NativeJavaScriptInterface.postMessage(
            _strParams
          );
        } else {
          window.NativeJavaScriptInterface.postMessage(_strParams);
        }
      } catch (e) {
        alert(e.message);
      }
    },
    isIos() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        return true;
      }
      return false;
    }
  }
});

function doGetUserDetail(_info) {
  try {
    // alert('原生方法获取的APP用户信息----'+JSON.stringify(_info)+'------数据类型------'+typeof _info);
    let thisScope = inviteApp;
    let _oInfo = typeof _info === "string" ? JSON.parse(_info) : _info;
    //alert('thisScope===='+JSON.stringify(_oInfo));
    window.userInfoCache = _oInfo;

    thisScope.methods.getMyInviteInfo(_oInfo);
  } catch (e) {
    alert("------doGetUserInfo----" + e.message);
  }
}

window.doGetUserDetail = doGetUserDetail;

//function tempFn() {
//    doGetUserDetail({'params':{'resultCode':'1','userInfo':{'tel':'15800362021'}}});
//}
//
//setTimeout(tempFn,1000)

export default inviteApp;
</script>

<style scoped>
.arrow {
  margin: 0 auto .2rem;
  width: 0;
  height: 0;
  border-left: 0.3rem solid transparent;
  border-right: 0.3rem solid transparent;
  border-top: 0.6rem solid #5D698E;
  position: relative;
}
.arrow p{
  position: absolute;
  top:-.6rem;
  left: -.1rem;
  color: white;
}
.radius {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 0.2rem;
  background: #b7e5ff;
  border: 3px solid #72c2ff;
  border-radius: 1.5rem;
  line-height: 3rem;
  text-align: center;
}
.radius span {
  font-size: 1.8rem;
}
.rule {
  background: #daf6fe;
  text-align: left;
  padding: 0.5rem 0 0 0.5rem;
}
.rule h5 {
  font-size: 0.45rem;
  font-weight: 600;
  color: #365288;
}
.rule div {
  line-height: 0.55rem;
  padding: 0 !important;
  color: #55719e;
  padding: 0.2rem 0.5rem 0.3rem 0 !important;
}

.nowrap {
  white-space: nowrap;
}
.invite-wrap {
  position: absolute;
  top: 0px;
  bottom: 0px;
  height: 100%;
  overflow: auto;
  background-color: #03AAFF;
  /* background-color: #9ce6ff; */
}
.invite {
  width: 10rem;
  height: 100%;
  position: relative;
  /*background: url('../../../assets/img/bg.png') no-repeat;*/
  /*background-size: 100% 18rem;*/
  /* background-color: #9ce6ff; */
  background-color: #03aaff;
  overflow: hidden;
}
.invite > img {
  position: absolute;
  width: 100%;
  height: auto;
}
.shareBox {
  width: 8.65rem;
  margin: 6rem auto;
  margin-bottom: 0;
  overflow: hidden;
}
.shareBox .weui-flex {
  padding-top: 0.6rem;
  height: 3.2rem;
}
.shareBox img {
  width: 1.71rem;
  height: 1.71rem;
}
.shareBox p {
  color: #0a6cb1;
}
.tabBox {
  width: 9.2rem;
  margin: 0 auto;
  /* padding-bottom: 10px; */
}
#myTab {
  height: 0.93rem;
  border: 0;
  margin: 0;
  padding: 0;
}
#myTabContent {
  background: white;
  z-index: 99;
}
#myTab li {
  /* background: #d6f4fd; */
  margin-top: 1px;
}
#myTab li {
  width: 4.5rem;
  height: 0.93rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
.nav-tabs > li > a {
  color: white;
  background-color: white;
  /* background-color: #3dcffe; */
  margin-right: 0;
  /* background: -webkit-linear-gradient(#3dcffe, #0097eb);
  background: linear-gradient(#3dcffe, #0097eb);  */
  background: #0d99e8;

  height: 0.93rem;
  /* border: 1px solid transparent; */
  text-align: center;
  font-weight: bolder;
  padding: 0;
  line-height: 0.93rem;
  outline: none;
  text-decoration: none;
  border: 0!important;
}
#myTabContent {
  overflow: hidden;
}
#myTabContent .s_img,
#myTabContent .d_img {
  text-align: center;
}
#myTabContent .s_img img {
  width: 1.33rem;
  height: 1.33rem;
}
#myTabContent .d_img img {
  width: 1.13rem;
  margin-top: 0.62rem;
}
.s_flow {
  margin: auto;
  margin-top: 0.9rem;
  margin-bottom: 0.3rem;
  width: 7.72rem;
}
.s_txt {
  margin: auto;
  width: auto;
  text-align: center;
}
.s_rules {
  background: #f5fdff;
}
.s_rule-txt {
  width: 8.53rem;
  height: 2.2rem;
  margin: 0 auto;
  padding-top: 0.5rem;
}
.s_box {
  width: 100%;
  background: #fff;
  overflow: hidden;
}
.c_blue {
  color: #0d2968;
}
.s_box h4 {
  margin: 1rem 0 0.4rem;
}
.s_box p {
  padding: 0 1.02rem;
  color: #1994e3;
}
.border_b {
  /* border-bottom: 1px solid #0fa8ee; */
  padding: 0.33rem;
  overflow: hidden;
  box-sizing: content-box;
}

.border_b:last-child {
  border: none;
}

.nav-tabs > li.active > a,
.nav-tabs > li.active > a:link,
.nav-tabs > li.active > a:active,
.nav-tabs > li.active > a:visited,
.nav-tabs > li.active > a:hover,
.nav-tabs > li.active > a:focus {
  color: #737C9C;
  /* background-color: white; */
  background: -webkit-linear-gradient(white, white); /* Safari 5.1 - 6.0 */
  background: linear-gradient(white, white); /* 标准的语法 */
  /* background-color: #d6f4fd;
  background: -webkit-linear-gradient(#d6f4fd, #d6f4fd);
  background: linear-gradient(#d6f4fd, #d6f4fd); 标准的语法 */
  cursor: default;
  outline: none;
  border-color: transparent;
  text-decoration: none;
  border: 0!important;
  /* margin-top: -1px; */
}
.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.75);
}
.dialog_box {
  position: absolute;
  width: 8rem;
  height: 3rem;
  margin: auto;
  background: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  z-index: 3;
}
.dialog_box p:first-child {
  padding: 10px;
  font-size: 0.5rem;
  font-weight: bolder;
  text-align: center;
}
.dialog_box p:last-child {
  padding: 5px 10px;
  text-align: center;
}
.tab-pane {
  overflow: hidden;
}
.font-blue {
  color: #1a538f;
}
</style>

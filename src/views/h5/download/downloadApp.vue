<template>
  <div class='download'>
    <img src="../../../assets/img/xz@2x.png" alt="">
    <div id='download' @click='download' href='demo url schemes' class="btn btn-lg btn-block no_radius">立即下载</div>
    <!-- <i class='glyphicon glyphicon-cloud'>icon</i> -->
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';


export default {
  data() {
    return {
    	msg:'download',
      iosUrl:'https://itunes.apple.com/cn/app/%E5%B9%BF%E6%B1%BD%E4%B8%B0%E7%94%B0%E4%B8%B0%E4%BA%91%E8%A1%8C/id1033830895?mt=8#',
      androidUrl:'http://a.app.qq.com/o/simple.jsp?pkgname=com.yongyou',

    }
  },
  components: {
  },
  //实例初始化最之前，无法获取到data里的数据
  beforeCreate(){
      
  	
  },  
  //在挂载开始之前被调用
  beforeMount(){
  	
  
  }, 
  //已成功挂载，相当ready()
  mounted(){
  // this.foo();
      
     
  },
  //相关操作事件
  methods: {
	init(){
		
	},
    download(){
      // this.ishas();
        sa.track('BtnClick',{
            'button_content':'邀请注册_下载按钮'

        });
      this.openapp();
    },
    ishas(){
      var the_href=$("#download").attr("href");//获得下载链接
      window.location="apps custom url schemes";//打开某手机上的某个app应用
      setTimeout(function(){
          window.location=the_href;//如果超时就跳转到app下载页
      },500);
    },
    openapp(){
      var _self = this;
      // if (this.isWeixin()) {
      //   window.location = this.wxUrl;
      //   return
      // };
        
      if (this.isIos()) {
        // window.location.href = "com.baidu.tieba://";
        window.setTimeout(function(){
          window.location.href = _self.iosUrl;//打开app下载地址，有app同事提供
        },100)
      }else{
        // window.location.href = "com.baidu.tieba://";
        window.setTimeout(function(){
          window.location.href = _self.androidUrl;//打开app下载地址，有app同事提供
        },100)
      }
    },
    isIos(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isiOS){
          return true
        }
        return false
    },
    isWeixin(){ //判断是否是微信
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
      } else {
          return false;
      }
    },
      
  }
}
</script>

<style scoped>
.download{
  /*width: 10rem;*/
  /*height: 18rem;*/
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #00b3ff;
  /*background: -webkit-linear-gradient(#6DAAF6, #368DF8); /* Safari 5.1 - 6.0 */
  /*background: linear-gradient(#6DAAF6, #368DF8); /* 标准的语法 */
  /*background: url('../../../assets/img/xz@2x.png') no-repeat;*/
  /*background-size: 100% 18rem;*/
   overflow: hidden;
}
.download>img{
  width: 100%;
  /*height: 100%;*/
}
.btn{
  color: #fff;
  border: 2px solid #fff;
  width: 4.72rem;
  height: 1.16rem;
  margin: auto;
  position:absolute;
  bottom: 0.3rem;
  left: 0;
  right: 0;
  padding: 0;
  line-height: 1.16rem;
  z-index: 1;
}


</style>

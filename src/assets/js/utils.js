var utils = {
    arr_split:function(index,data){       
        var result = [];
        for(var i=0,len=data.length;i<len;i+=index){
           result.push(data.slice(i,i+index));
        }
        return result;
    },
    foo:function(){
    	console.info('[sdm] ===== >  加载utils.js')
    },
    GetUrl:function (name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); return null; 
    },
    GetParam:function (name){
        var res = window.location.href.split("?")[name];

        return res;
    },
    isPhone:function(num){
        var phoneReg = /^1[34578][0-9]\d{8}$/;
        if (!phoneReg.test(num)) {
            return false
        };
        return true
    },
    isEmpty:function(str){
        if(str.length == 0 || str == ''){
            return true
        };
        return false
    },
    device:function(){
        var agent = navigator.userAgent.toLowerCase();
 
        //将版本字符转化成浮点型
        var parseVersion = function(label){
        var exp = new RegExp(label+'/([^\\s\\_\\-]+)');
        label = (agent.match(exp)||[])[1];
        return label ? label.replace(/(?!^\d+\.)(\b\d+)./g, '$1') : false
        };

        var result = {
        //获取当前操作系统
        os: function(){
          if(/windows/.test(agent)){
            return 'windows';
          } else if(/linux/.test(agent)){
            return 'linux';
          } else if(/|iphone|ipod|ipad|ios/.test(agent)){
            return 'ios';
          }
        }()

        //获取微信版本，不在微信WebWiew则返回falase
        ,weixin: parseVersion('micromessenger')

        //获取你的App版本，不在App WebWiew则返回falase。记得把myapp改成你的app特殊标识
        ,myapp: parseVersion('myapp')
        };


        result.android = /android/.test(agent); //是否安卓
        result.ios = result.os === 'ios'; //是否IOS

        return result;
    }
    

};
module.exports = utils;
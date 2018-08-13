import vuex from 'vuex'
import vue from 'vue'
import actions from './action'
import mutations from './mutation'
vue.use(vuex);
export default new vuex.Store({
    state:{
        demo: [
            {
                id:'001',
                title:'IOS',
                content:'iOS 是一个由苹果公司开发和发布的手机操作系统。最初是于 2007 年首次发布 iPhone、iPod Touch 和 Apple',
                edit:false
            },
            {
                id:'002',
                title:'jMeter',
                content:'jMeter 是一款开源的测试软件。它是 100% 纯 Java 应用程序，用于负载和性能测试。',
                edit:false
            },
            {
                id:'003',
                title:'EJB',
                content:'Enterprise Java Beans（EJB）是一个创建高度可扩展性和强大企业级应用程序的开发架构，部署在兼容应用程序服务器（比如 JBOSS、Web Logic 等）的 J2EE 上。',
                edit:false
            }
        ],
    },
    actions,
    mutations,
    //获取数据方法
    getters:{
        demo(state){
            // console.log(state)
            return state.demo
        },
    }
})
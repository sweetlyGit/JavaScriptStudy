<template>
    <div class="register"  v-cloak>
        <div class="banner">
            <img src="../../../assets/img/fyx_zc@2x.png" alt="静待网络加载哦" class="banner">
        </div>
        <div class="phoneNum">
            <div class="borderDiv">
                <img src="../../../assets/img/phone@2x.png" alt="测试" class="inputImage">
                <input  class="inputPhone" type="text" placeholder="请输入手机号">
            </div>
        </div>
        <div class="VertyCode"></div>
    </div>
</template>
<style scoped>
    .register{
        width: 100%;
        height: 18rem;
        position: relative;
    }
    .topImg{
        position: relative;
        width: 100%;
        color: #ccc;
        text-align: center;
        overflow: hidden;
        z-index: 1;
    }
    .phoneNum{
        width: 100%;
        height: 60px;
        background: green;
        position: relative;
    }
    .borderDiv{
        width: 70%;
        height: 30px;
        left: 15%;
        right: 15%;
        top: 15px;
        bottom: 15px;
        position: relative;
        border: 1px solid #cccccc;
        border-radius: 2px;
    }
     .inputImage{
        width: 30px;
        height: 30px;
        position: absolute;
        left: 5px;
    }
    .inputPhone{
        margin-left: 35px;
    }
        
   
    .VertyCode{
        width: 100%;
        height: 60px;
        background: orange
    }

</style>


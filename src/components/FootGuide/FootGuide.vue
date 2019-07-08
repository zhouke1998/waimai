<template>
    <div class="footer">
        <span class="guide_home" @click="goTo('/home')">
          <span class="iconfont icon-waimai" :class="{on:$route.path==='/home'}"></span>
          <span class="title">外卖</span>
        </span>
        <span class="guide_search"  @click="goTo('/search')">
          <span class="iconfont icon-tuanduicankaoxian-6" :class="{on:$route.path==='/search'}"></span>
          <span class="title">搜索</span>
        </span>
        <span class="guide_order" @click="goTo('/order')">
          <span class="iconfont icon-wodedingdan" :class="{on:$route.path==='/order'}"></span>
          <span class="title">订单</span>
        </span>
        <span class="guide_mine" @click="goTo('/mine')">
          <span class="iconfont icon-wodejuhuasuan" :class="{on:$route.path==='/mine'}"></span>
          <span class="title">我的</span>
        </span>
    </div>
</template>

<script>
  export default {
    methods:{
      goTo(path){
        this.$router.replace(path)
      }
    }
  }
</script>

<style scoped>
  .footer{
    position: fixed;
    border-top: 1px solid #eee;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    height: 50px;
    padding-top: 5px;
    box-sizing: border-box;
    z-index: 2001;
  }
  .footer .on{
    color: #02a774;
  }
  .footer >span{
    flex: 1;
    text-align: center;
  }
  .footer .iconfont{
    font-size: 1.3rem;
  }
  .footer .title{
    display: block;
  }
</style>

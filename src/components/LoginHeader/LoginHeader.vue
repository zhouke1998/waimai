<template>
  <div class="loginHeader">
    <div class="grid-content">
      <i class="return" @click="$router.go(-1)"><span class="iconfont icon-jiantou-copy-copy"></span></i>
    </div>
    <div class="grid-content title">
      <!--<slot name="left_title"></slot>-->
      <span>{{left_title}}</span>
    </div>
    <div class="grid-content al-right">
      <slot name="right_link"></slot>
    </div>
    </div>
</template>

<script>
    export default {
      name: "LoginHeader",
      methods:{
        ret(){
          this.$router.go(-1)
        },
      },
      props:{
        left_title:String,
      }
    }
</script>

<style scoped>
  .loginHeader {
    height: 50px;
    background-color: #02a774;
    padding: 0 10px;
    font-size: 0.9rem;
    line-height: 50px;
    margin-bottom: 10px;
    color: #fff;
    display: flex;
  }

  .loginHeader > div:first-child {
    width: 20%;
    text-align: left;
  }
  .grid-content {
    min-height: 36px;
    height: 50px;
  }
  .return{
    line-height: 50px;
    font-size: 1.25rem;
    display: inline-block;
    width: 50%;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    border-radius: 20px;
  }
  .return:active{
    background-color: #fff;
    opacity: 0.2;
  }

  .title {
    width: 60%;
    text-align: center;
  }
  .al-right{
    width: 20%;
    color: #fff;
    text-align: right;
  }

  .grid-content a {
    text-decoration: none;
    color: #fff;
  }
</style>

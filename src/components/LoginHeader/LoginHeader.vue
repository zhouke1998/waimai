<template>
    <Headertop :title="title" >
      <div class="login-left" slot="left">
        <i class="return" @click="$router.go(-1)"><span class="iconfont icon-jiantou-copy-copy"></span></i>
      </div>
      <div class="login-right" slot="right">
        <slot name="right_link"></slot>
      </div>
    </Headertop>
</template>

<script>
  import Headertop from '../Headertop/HeaderTop'
    export default {
      name: "LoginHeader",
      methods:{
        ret(){
          this.$router.go(-1)
        }
      },
      props:{
        title:String,
      },
      components:{
        Headertop
      }
    }
</script>

<style scoped>
  .login-left {
    min-height: 36px;
    width: 25%;
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
  .login-right{
    width: 25%;
    color: #fff;
    text-align: right;
    line-height: 50px;
    font-size: .9rem;
  }
</style>

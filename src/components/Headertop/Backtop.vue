<template>
  <Headertop :title="title">
    <div class="back" slot="left">
      <a class="return" @click="backClick">
        <span class="iconfont icon-jiantou-copy-copy" ></span>
      </a>
    </div>
    <div class="login-right" slot="right">
    </div>
  </Headertop>
</template>

<script>
  import Headertop from './HeaderTop'
    export default {
      name: "Backtop",
      components:{
        Headertop
      },
      props:{
        title:String,
        router_back:{
          type:Boolean,
          default:true
        },
      },
      methods: {
        backClick() {
          if (this.router_back) {
            this.$router.back()
          }else{
            this.$parent.backClick()
          }
        }
      }
    }
</script>

<style scoped>
  .back{
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
  }
</style>

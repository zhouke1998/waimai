<template>
  <Headertop :title="title" :router_back="router_back">
    <div class="back" slot="left">
      <a @click="backClick">
        <span class="iconfont icon-jiantou-copy-copy" ></span>
      </a>
    </div>
  </Headertop>
</template>

<script>
  import Headertop from '../../components/Headertop/HeaderTop'
    export default {
      name: "Backtop",
      components:{
        Headertop
      },
      props:{
        title:String,
        router_back:String,
      },
      methods: {
        backClick() {
          if (this.router_back!=="false") {
            console.log(this.router_back);
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
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
  }
</style>

<template>
  <div class="header">
    <slot name="left"></slot>
    <p>
      <span class="ellipsis" @click="selectAddress">{{title}}</span>
    </p>
    <slot name="right"></slot>
  </div>
</template>

<script>
    export default {
      name: "HeaderTop",
      props:{
        title:String
      },
      methods:{
        selectAddress(){
          this.$router.push("address")
        }
      }
    }
</script>

<style scoped>
  .header{
    padding: 0 10px;
    color: #fff;
    height: 50px;
  }
  .header a{
    text-decoration: none;
    display: inline-block;
    color: #fff;
  }
  .header{
    display: flex;
    background-color: #02a774;
    position: relative;
  }
  .header>p{
    width: 50%;
    text-align: center;
    margin: 0 auto;
  }
  .header p>span{
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 50px;
    color: #fffeee;
    text-align: center;
    font-size: 1.3rem;
  }
</style>


<template>
  <div class="header">
    <slot name="left"></slot>
    <p>
      <span class="ellipsis">{{title}}</span>
    </p>
    <slot name="right"></slot>
  </div>
</template>

<script>
    export default {
      name: "HeaderTop",
      props:{
        title:String
      }
    }
</script>

<style scoped>
  .header a{
    text-decoration: none;
    display: inline-block;
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


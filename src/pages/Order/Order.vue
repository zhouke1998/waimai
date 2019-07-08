<template>
    <section>
      <HeaderTop title="订单列表"></HeaderTop>
      <div v-if="!$store.state.user.phone" class="content">
        <span><img src="./img/e1e.gif"/></span>
        <p class="tip">登录后查看外卖订单</p>
        <p><router-link to="/login">立即登录</router-link></p>
      </div>
      <div v-else class="order">
        <div class="tips">
          最近没有订单...
        </div>
        <div class="orderList">

        </div>
      </div>
    </section>
</template>

<script>
  import HeaderTop from "../../components/Headertop/HeaderTop";
  export default {
    components: {
      HeaderTop
    }
  }
</script>

<style scoped>
  section{
    overflow: hidden;
  }
  .content{
    height: 100%;
  }
  .content>span{
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 60%;
    box-sizing: border-box;
    padding-top: 140px;
  }
  .content>span img{
    width: 55%;
  }
  .content p{
    text-align: center;
    color: #888;
    font-size: 0.9rem;
    line-height: 40px;
    height: 40px;
  }
  .content>p a{
    display: inline-block;
    background-color:#4dc060;
    border-radius: 4px;
    color: #fff;
    font-size: 1rem;
    letter-spacing: 2px;
    width: 30%;
    text-decoration: none;
  }
  .order,.tips{
    text-align: center;
    color: #666666;
    margin-top: 50px;
  }
</style>

<!-- 点击标题的弹出框 -->
<template>
  <section class="vipBox">
    <transition name="bounce_title">
      <div class="mesBox">
        <div class="header">
          <!--<bg>背景。。。</bg>-->
          <img src="./img/header.gif">
          <p>开通超级会员</p>
        </div>
        <div class="content">
          <div class="photo">
            <img src="./img/envelope.gif" />
            <p>本单立享</p>
            <div class="amount">
              <i>￥</i>
              <span>{{vipRedpack.amount}}</span>
            </div>
          </div>
          <div class="vip_desc">
            <article>
              开通会员每月领至少20元无门槛红包平均每年
              <span>
                {{vipRedpack.popup_tips.highlight}}
              </span>
            </article>
          </div>
        </div>
        <div class="btn">
          <span class="no" @click="wrap_close">放弃优惠</span>
          <span class="yes">立即开通</span>
        </div>
      </div>
    </transition>
    <div @touchmove.prevent class="wrap"></div>
  </section>
</template>

<script>
    export default {
      data() {
        return {
        }
      },
      props:{
        vipRedpack:Object,//会员红包信息
      },
      methods:{
        wrap_close(){
          this.$emit('closeVipBox')
        }
      }
    }
</script>

<style scoped>
  /*点击标题弹出框*/
  .vipBox{
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    z-index: 60;
  }
  .wrap{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.3);
  }
  .vipBox .mesBox{
    width: 80%;
    max-width: 350px;
    min-width: 200px;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
    z-index: 10;
    /*transition: all .5s ease-in-out;*/
  }
  .mesBox{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    /*height: 60%;*/
  }
  .mesBox .header{
    position: relative;
    text-align: center;
    top: -1.5rem;
  }
  .header img{
    width: 50%;
    position: relative;
  }
  .header p{
    width: 100px;
    height: 2rem;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    top: 0;
    color: #734327;
    font-size: 1rem;
    line-height: 2rem;
  }
  .mesBox .content{
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    width: 65%;
    color: #7d490f;
  }
  .content .photo{
    position: relative;
  }
  .content .photo img{
    position: absolute;
    top: -1rem;
    left: 20%;
    width: 60%;
    z-index: -1;
  }
  .content p{
    color: #fff;
    line-height: 2rem;
    position: relative;
    top: -.75rem;
  }
  .content .amount{
    display: flex;
    justify-content: center;
    line-height: 3rem;
    align-items: center;
    letter-spacing: .2rem;
    margin-top: -5px;
  }
  .amount span{
    font-size: 3rem;
  }
  .vip_desc{
    text-align: left;
    font-size: .75rem;
    color: #666;
    margin-top: 2.5rem;
    padding: 0 1rem;
  }
  .vip_desc span{
    color: #ff5339;
  }
  .mesBox .btn{
    padding: 1.5rem .5rem 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
  }
  .btn span{
    width: 48%;
    text-align: center;
    border: 1px solid rgba(0,0,0,.15);
    font-size: 1rem;
    font-weight: bold;
    line-height: 2.5rem;
    color: #333;
    border-radius: 3px;
  }
  .btn .yes{
    background-image: linear-gradient(90deg,#ffeda1,#e3c957);
    color: #7b460a;
    border: none;
  }
</style>

<!-- 点击标题的弹出框 -->
<template>
  <section v-if="is_title_wrap" class="title_click_wrap">
    <transition name="bounce_title">
      <div v-if="title_wrap" class="mesBox">
        <h2>{{foodShopInfo_rst.name}}
        </h2>
        <ul class="info_list">
          <li>
            <h3>{{foodShopInfo_rst.rating}}</h3>
            <p>评分</p>
          </li>
          <li>
            <h3>{{foodShopInfo_rst.recent_order_num}}单</h3>
            <p>月售</p>
          </li>
          <li>
            <h3>{{foodShopInfo_rst.delivery_mode.text}}</h3>
            <p>约{{foodShopInfo_rst.order_lead_time}}分钟</p>
          </li>
          <li>
            <h3>{{foodShopInfo_rst.float_delivery_fee}}元</h3>
            <p>配送费</p>
          </li>
          <li>
            <h3>{{getDistance(foodShopInfo_rst.distance)}}</h3>
            <p>距离</p>
          </li>
        </ul>
        <p><span>公告</span></p>
        <article>
          {{foodShopInfo_rst.promotion_info}}
        </article>
      </div>
    </transition>
    <div @touchmove.prevent  @click="close_title_wrap()" class="close"></div>
  </section>
</template>

<script>
    export default {
      name: "TitleWrap",
      data() {
        return {
          title_wrap:false, //动画
        }
      },
      computed:{
        foodShopInfo_rst(){
          return this.$parent.foodShopInfo_rst
        }
      },
      props:{
        is_title_wrap:Boolean,
      },
      watch:{
        is_title_wrap(){
          this.$nextTick(()=>{
            this.title_wrap = this.is_title_wrap
          })
        }
      },
      methods:{
        close_title_wrap(){
          this.$emit('close_title_wrap',1);
        },
        getDistance(dis){
          if(dis<1000){
            return dis+'m'
          }
          return Math.round(dis/100)/10+'km'
        }
      }
    }
</script>

<style scoped>
  /*点击标题弹出框*/
  .title_click_wrap{
    position: fixed;
    flex-direction: column;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 50;
  }
  .title_click_wrap .mesBox{
    width: 80%;
    max-width: 350px;
    min-width: 200px;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
    overflow: hidden;
    /*transition: all .5s ease-in-out;*/
  }
  .mesBox>h2:before{
    content: "品牌";
    font-size: .75rem;
    display: inline-block;
    padding:0 1px;
    background-color: yellow;
    border-radius: 3px;
    margin-right: 2px;
    position: relative;
    top: -2px;
  }
  .mesBox>h2{
    font-size: 1.25rem;
    line-height: 1.5;
    margin-bottom: 15px;
    text-align: center;
  }
  .mesBox>ul{
    display: flex;
  }
  .mesBox>ul li{
    flex: 1;
  }
  .mesBox li {
    text-align: center;
  }
  .mesBox li h3{
    color: #333;
    font-size: .8rem;
  }
  .mesBox p{
    color: #999;
    font-size: .65rem;
  }
  .mesBox>p{
    text-align: center;
    width: 80px;
    margin: 15px auto 5px;
    background-size: 100% 1px;
    background: linear-gradient(90deg, #fff, #333 50%, #fff) no-repeat 0 center;
    background-size: 100% 1px;
  }
  .mesBox>p span{
    background: #fff;
    padding: 0 2px;
  }
  .mesBox article{
    padding: 10px;
    font-size: .75rem;
    line-height: 1.25rem;
    white-space: normal;
    word-wrap: break-word;
    letter-spacing: 1px;
  }
  .title_click_wrap .close{
    margin-top: 2rem;
    background: url("./img/close.png") no-repeat 0 0;
    background-size: 2rem;
    width: 2rem;
    height: 2rem;
  }

  /*动画*/
  /*点击标题动画*/
  .bounce_title-enter {
    transform:scale(0);
  }
  .bounce_title-leave{

  }
  .bounce_title-enter-active{
    /*opacity: 1;
    transform:scale(1);*/
    transition:all .3s;
    /*animation:bounce-in .3s;*/
  }
  .bounce_title-leave-active{
  }
</style>

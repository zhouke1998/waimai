<template>
  <section  v-if="is_envelope_wrap" class="envelope_click_wrap">
    <transition name="bounce_envelope">
      <section  v-if="envelope_wrap" class="envelope_content">
        <h2>店铺专享红包</h2>
        <div >
          <h4 v-if="getVipRedpack.length" class="vip_envelope_header">
            <span>超级会员特权</span>
            <p>限超级会员用户兑换</p>
          </h4>
          <h4 v-else class="vip_envelope_header">
            <span>可领红包</span>
          </h4>
          <ul>
            <li v-for="(redpack,index0) in getVipRedpack" :key="index0" class="vip_envelope">
              <div class="envelope_info">
                <div class="info_desc">
                  <span>{{redpack.amount}}</span>
                  <div>
                    <h4>
                      <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-huangguan1"></use>
                    </svg>
                      {{redpack.name}}</h4>
                    <p>{{redpack.description}}</p>
                  </div>
                </div>
                <div class="info_btn">
                  <p @click="showVipBox">
                    <b>兑换</b>
                  </p>
                </div>
              </div>
            </li>
            <li v-for="(redpack,index1) in getShopRedpack" :key2="index1" class="">
              <div class="envelope_info">
                <div class="info_desc">
                  <span>{{redpack.amount}}</span>
                  <div>
                    <h4>{{redpack.name}}</h4>
                    <p>{{redpack.description}}</p>
                  </div>
                </div>
                <div :class="{info_btn_img:redpack.status,info_btn:1}">
                  <p v-if="!redpack.status">
                    <b>兑换</b>
                  </p>
                  <img v-else src="./img/已领取.png"/>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <span @click="close_envelope_wrap()">×</span>
      </section>
    </transition>
    <div @touchmove.prevent  @click="close_envelope_wrap()" class="wrap"></div>
    <VipBox :vipRedpack="getVipRedpack[0]" v-if="vipBoxShow" @closeVipBox="closeVipBox"></VipBox>
  </section>
</template>

<script>
  import VipBox from './VipBox/VipBox'
    export default {
      data() {
        return {
          envelope_wrap:false, //动画
          vipBoxShow:false, //会员红包弹出
        }
      },
      components:{
        VipBox
      },
      props:{
        is_envelope_wrap:Boolean,
        redpackInfo:Object,
      },
      watch:{
        is_envelope_wrap(){
          this.$nextTick(()=>{
            this.envelope_wrap = this.is_envelope_wrap
          })
        }
      },
      methods:{
        close_envelope_wrap(){
          this.$emit('close_envelope_wrap',2);
        },
        showVipBox(){
          this.vipBoxShow = true
        },
        closeVipBox(){
          this.vipBoxShow = false
        },
      },
      computed:{
        getVipRedpack(){
          if(!this.redpackInfo.redpack){
            return []
          }
          for(let redpack of this.redpackInfo.redpack){
            if(redpack.condition_type===1 && redpack.status===3){
              return [redpack]
            }
          }
          return []
        },
        getShopRedpack(){
          if(!this.redpackInfo.redpack){
            return []
          }
          let redpacks = []
          for(let redpack of this.redpackInfo.redpack){
            if(redpack.condition_type===0 && redpack.status===0){
              redpacks.push(redpack)
            }
          }
          return redpacks
        }
      }
    }
</script>

<style scoped>
  /*活动样式*/
  .envelope_click_wrap{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 50;
  }
  .envelope_content{
    padding: 10px 20px;
    background-color: #f5f5f5;
    text-align: left;
    z-index: 10;
    height: 50%;
    position: relative;
    box-sizing: border-box;

  }
  .envelope_content h2{
    text-align: center;
    font-size: 1rem;
    line-height: 2rem;
    color: #333;
    padding-bottom: .5rem;
  }
  .envelope_content>div{
    height: 100%;
    overflow-y: scroll;
  }
  .vip_envelope_header{
    display: flex;
    color: #666;
    font-size: .7rem;
    line-height: .75rem;
    margin-top: 10px;
  }
  .vip_envelope_header P{
    margin-left: 5px;
    color: #999;
    font-size: .5rem;
    font-weight: lighter;
  }
  .envelope_content ul{
    padding-bottom: 50px;
  }
  .envelope_content li{
    margin-top: 10px;
  }
  .envelope_content .envelope_info{
    display: flex;
    background-color: #fff;
    border: .05rem solid #eae5b9;
    position: relative;
    height: 100px;
    justify-content: space-between;
    color: #333;
    border-radius: 2px;
  }
  .vip_envelope .envelope_info{
    background-color: #fff4be;
  }
  .envelope_info:before{
    content: '';
    position: absolute;
    width: 1px;
    height: 80%;
    border-right: 1px dashed #eec2b7;
    margin-top: 10px;
    right: 30%;
  }

  .envelope_content .info_desc{
    display: flex;
    padding-left: 15px;
    align-items: center;
    box-sizing: border-box;
    width: 70%;
    position: relative;
  }

  .envelope_content .info_desc:before,.envelope_content .info_desc:after{
    position: absolute;
    content: '';
    width: .6rem;
    height: .3rem;
    border: 1px solid #eae5b9;
    border-radius: 0 0 .4rem .4rem;
    background-color: #f5f5f5;
    border-top: none;
    right: 0;
    transform: translateX(50%);
    z-index: 11;
  }
  .envelope_content .info_desc:before{
    top: -1px;
  }
  .envelope_content .info_desc:after{
    bottom: -1px;
    transform: rotate(180deg) translateX(-50%);
  }
  .envelope_content .info_desc>span{
    color: #ff5339;
    font-size: 2rem;
    font-weight: bold;
    line-height: 2rem;
    display: flex;
  }
  .vip_envelope .info_desc>span{ /*vip专享红包*/
    color: #594519;
  }
  .envelope_content .info_desc>span:before{
    content: '￥';
    font-size: .75rem;
  }
  .envelope_content .info_desc div{
    padding-left: 15px;
  }
  .envelope_content .info_desc h4{
    /*color: #594519;*/
    font-size: .9rem;
  }
  .envelope_content .info_desc p{
    padding-top: 5px;
    color: #666;
    font-size: .65rem;
   }
  .vip_envelope .info_desc p{
    color: #735b27;
  }
  .info_btn{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;
  }
  .info_btn p{
    width: 60%;
    border-radius:1rem;
    background-color: #ff5339;
    text-align: center;
    color: #fff;
    height: 2rem;
    line-height: 2rem;
    font-size: .85rem;
  }
  .info_btn_img{
    justify-content: flex-end;
  }
  .info_btn img{
    width: 90%;

  }
  .vip_envelope .info_btn p{
    background-color: #5d4a1d;
    color: #fff4be;
  }
  .envelope_content>span{
    position: absolute;
    font-size: 2rem;
    right: 20px;
    top: 5px;
    color: #999;
  }
  .envelope_click_wrap .wrap{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.3);
  }

  /*动画*/
  .bounce_envelope-enter {
    height: 0px;
  }
  .bounce_envelope-enter-active{
    transition:height .2s;
  }
</style>

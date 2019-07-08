<template>
  <section v-if="is_active_wrap" class="active_click_wrap">
    <transition name="bounce">
      <section v-if="active_wrap" class="active_content">
        <h2>优惠活动</h2>
        <ul>
          <li v-for="(activity,index) in foodShopInfo_active" :key="index">
            <p>
              <span :style="{backgroundColor:'#'+activity.icon_color}">{{activity.icon_name}}</span>
              {{activity.description}}
            </p>
          </li>
        </ul>
        <span @click="close_active_wrap()">×</span>
      </section>
    </transition>
    <div @touchmove.prevent  @click="close_active_wrap()" class="wrap"></div>
  </section>
</template>

<script>
    export default {
      data() {
        return {
          active_wrap:false,
        }
      },
      props:{
        is_active_wrap:Boolean,
        foodShopInfo_active:Array,//接收活动信息
      },
      watch:{
        is_active_wrap(){
          this.$nextTick(()=>{
            this.active_wrap = this.is_active_wrap
          })
        }
      },
      methods:{
        close_active_wrap(){
          this.$emit('close_active_wrap',3);
        },
      }
    }
</script>

<style scoped>
  /*活动样式*/
  .active_click_wrap{
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
  .active_content{
    padding: 10px 20px;
    background-color: #f5f5f5;
    text-align: left;
    z-index: 10;
    height: 230px;
    position: relative;
  }
  .active_content h2{
    text-align: center;
    font-size: 1rem;
    line-height: 1.5rem;
    color: #333;
  }
  .active_content li{
    margin-top: 10px;
    font-size: .8rem;
    line-height: 1rem;
  }
  .active_content li span{
    background-color: red;
    color: #fff;
    font-size: .65rem;
    font-weight: bold;
    display: inline-block;
    padding:0 2px;
    height: 1rem;
    line-height: 1.1rem;
    border-radius: 2px;
  }
  .active_content li{
    margin-top: 10px;
  }
  .active_content>span{
    position: absolute;
    font-size: 2rem;
    right: 20px;
    top: 5px;
    color: #999;
  }
  .active_click_wrap .wrap{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.3);
  }

  /*动画*/
  /*动画在父组件中定义*/
  .bounce-enter{
    height: 0px;
  }
  .bounce-enter-active{
    transition:height .2s;
  }
</style>

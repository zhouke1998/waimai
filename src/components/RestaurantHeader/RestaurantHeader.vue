<template>
    <section v-if="foodShopInfo_rst">
      <div class="header_top">
        <nav class="header_bg" :style="{backgroundImage:`url('${getImagePath(foodShopInfo_rst.shop_sign.image_hash,'imageMogr/format/webp/thumbnail/750x/')}')`}">
          <span class="back" @click="$router.back()">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiantou-copy-copy"></use>
            </svg>
          </span>
        </nav>
      </div>
      <section class="header_content">
        <div class="photo">
          <span>
          </span>
          <img :src="getImagePath(foodShopInfo_rst.image_path,'imageMogr/format/webp/thumbnail/150x/')">
        </div>
        <div class="title" @click="wrap_click(1)">
          <h1 class="ellipsis">{{foodShopInfo_rst.name}}</h1>
          <i class="arrow"></i>
        </div>
        <div class="rating">
          <p class="ellipsis">
            <span class="rate1">评价{{foodShopInfo_rst.rating}}</span>
            <span class="rate2">月售{{foodShopInfo_rst.recent_order_num}}单</span>
            <span class="rate2">{{foodShopInfo_rst.delivery_mode.text}}<span>约{{foodShopInfo_rst.order_lead_time}}分钟</span></span>
          </p>
        </div>
        <div v-if="foodShopInfo_rst.redpack.length" class="envelope">
          <div @click="wrap_click(2)">
            <p v-if="foodShopInfo_rst.redpack[0].type">
            <span class="c1">
              <!--<small>￥</small>-->
              <span>{{foodShopInfo_rst.redpack[0].value}}</span>
            </span>
            <span class="c2">
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-huangguan1"></use>
              </svg>
              <span>{{foodShopInfo_rst.redpack[0].title}}</span>
            </span>
            <span class="c3">
              <span>领取</span>
            </span>
          </p>
            <p v-if="foodShopInfo_rst.redpack.length>1" class="shop_envelope">
            <span class="c1">
              共
              <!--<b>￥</b>-->
              <span>{{foodShopInfo_rst.redpack[1].value}}</span>
            </span>
            <span class="c2">
              <i></i>
              <span>{{foodShopInfo_rst.redpack[1].title}}</span>
            </span>
            <span class="c3">
              <span>领取</span>
            </span>
          </p>
            <p v-else-if="foodShopInfo_rst.redpack[0].type==0" class="shop_envelope">
            <span class="c1">
              共
              <!--<b>￥</b>-->
              <span>{{foodShopInfo_rst.redpack[0].value}}</span>
            </span>
              <span class="c2">
              <i></i>
              <span>{{foodShopInfo_rst.redpack[0].title}}</span>
            </span>
              <span class="c3">
              <span>领取</span>
            </span>
            </p>
          </div>
        </div>
        <div @click="wrap_click(3)" class="active">
          <p class="ellipsis">
            <span class="ac1">满减</span>
            <span class="ac2">{{foodShopInfo_rst.activities[0].description}}</span>
          </p>
          <div class="spread">
            <span>{{foodShopInfo_rst.activities.length}}个优惠</span>
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjOTk5IiBkPSJNNC41NzcgNS40MjNjLjc5Ljc3IDIuMDczLjc2NyAyLjg1NyAwbDQuMTItNC4wMjZDMTIuMzQ1LjYyNSAxMi4wOSAwIDEwLjk4NSAwSDEuMDI3Qy0uMDc3IDAtLjMzLjYzLjQ1NyAxLjM5N2w0LjEyIDQuMDI2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+" />
          </div>
        </div>
        <div v-if="foodShopInfo_rst.promotion_info" class="ad_info">
          <p class="ellipsis">公告：{{foodShopInfo_rst.promotion_info}}</p>
        </div>
      </section>
      <TitleWrap :is_title_wrap="is_title_wrap"  @close_title_wrap="close_wrap"></TitleWrap>
      <ActiveWrap :foodShopInfo_active="foodShopInfo_rst.activities" :is_active_wrap="is_active_wrap"  @close_active_wrap="close_wrap"></ActiveWrap>
      <EnvelopeWrap :redpackInfo="redpackInfo"  :is_envelope_wrap="is_envelope_wrap"  @close_envelope_wrap="close_wrap"></EnvelopeWrap>
    </section>
</template>

<script>
  import TitleWrap from './TitleWrap/TitleWrap'
  import ActiveWrap from './ActiveWrap/ActiveWrap'
  import EnvelopeWrap from './EnvelopeWrap/EnvelopeWrap'
  import {mapState} from 'vuex'
  import {getImagePath} from "../../utils/getImagePath";
  import {getDetails} from "../../api";

  export default {
      name: "RestaurantHeader",
      components:{
        TitleWrap,
        ActiveWrap,
        EnvelopeWrap,
      },
      computed:{
        ...mapState({foodsShop:'foodsShop'}),
        foodShopInfo_rst(){ //获取头部组件需要的数据
          //2019.8.20
          let foodShopInfoHeader = this.foodsShop.rst || null
          if(foodShopInfoHeader){
            foodShopInfoHeader['redpack'] = this.foodsShop.redpack
            foodShopInfoHeader['restaurant_id'] = this.foodsShop.restaurant_id
          }
          return foodShopInfoHeader
        },
      },
      data(){
          return{
            is_title_wrap: false,
            is_active_wrap: false,
            is_envelope_wrap: false,
            redpackInfo:{},//红包信息
          }
      },
      mounted(){
          document.documentElement.scrollTop = 0
      },
      watch:{
        foodsShop(){
          if(!this.foodsShop.restaurant_id){
            this.$parent.alertInfo()
          }
        }
      },
      methods:{
        wrap_click(index){
          //index 1代表title点击,2代表envelope点击，3代表active点击
          if(index==1){
            this.is_title_wrap = true
          }else if(index==2){
            this.is_envelope_wrap = true
            this.getRedpackInfo() //获取红包信息
          }else if(index==3){
            this.is_active_wrap = true
          }
        },
        close_wrap(index){
          //index 1代表title关闭,2代表envelope关闭，3代表active关闭
          if(index==1){
            this.is_title_wrap = false
          }else if(index==2){
            this.is_envelope_wrap = false
          }else if(index==3){
            this.is_active_wrap = false
          }
        },
        getImagePath(image_hash,suffix){
          //console.log(image_hash);
          return getImagePath(image_hash?{image_hash,suffix}:{image_hash:this.foodShopInfo_rst.image_path,suffix:'imageMogr/format/webp/thumbnail/750x/thumbnail/!40p/blur/50x40/'})
        },
        async getRedpackInfo(){ //获取红包信息
          let res = await getDetails(this.foodShopInfo_rst.restaurant_id)
          if(res){
            this.redpackInfo = res
          }
        }
      }
    }
</script>

<style scoped>
  .header_top{
    padding-top: 100px;
    position: relative;
  }
  .header_bg{
    background-size: cover;
    position: absolute;
    height: 100px;
    left: 0;
    right: 0;
    top: 0;
  }
  .header_bg:before{
    content: '';
    background:linear-gradient(0deg,hsla(0,0%,100%,0), rgba(0,0,0,.4));
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .header_bg .back{
    position: absolute;
    left: 20px;
    top: 10px;
    color: #fff;
    font-size: 20px;
  }
  .header_content{
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
    position: relative;
  }
  .header_content .photo{
    position: absolute;
    width: 70px;
    height: 70px;
    margin-left: -35px;
    margin-top: -50px;
    left: 50%;
  }
  .header_content .photo img{
    height: 100%;
    width: 100%;
    border-radius: 3px;
  }
  .header_content .photo span{
    position: absolute;
    background-color: yellow;
    padding-right: 3px;
  }
  .header_content .photo span:before,.mesBox>h2:before{
    content: '品牌';
    color: #6f3f15;
    font-weight: bold;
    font-size: .6rem;
    letter-spacing: -1px;
  }
  .header_content .title{
    text-align: center;
    width: 70%;
    font-size: 20px;
    font-weight: bold;
    margin:30px auto 0;
    position: relative;
    /*display: flex;
    justify-content: space-between;*/
  }
  .header_content .title h1 {
    width: 100%;
    box-sizing: border-box;
    padding-right: 30px;
  }
  .header_content .arrow{
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
  }
  .header_content .arrow:before{
    content: '';
    border-width: .5rem;
    position: absolute;
    border-color: transparent transparent transparent #555;
    border-style: solid;
    top: 5px;
  }
  .rating{
    display: flex;
    text-align: center;
    width: 70%;
    margin-top: 5px;
    margin: 0 auto;
  }
  .rating p{
    width: 100%;
    text-align: center;
    font-size: .65rem;
    color: #666;
  }
  .rating span:not(:last-child){
    margin-right: 5px;
  }
  .envelope{
    margin: 5px auto 0;
    width: 80%;
    display: flex;
    justify-content: center;
  }
  .envelope>div{
    display: flex;
    justify-content: center;
  }
  .envelope p{
    width: 130px;
    min-width: 120px;
    background-color: #ffe578;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: .65rem;
    text-align: right;
    position: relative;
  }
  .envelope .c1{
    margin-right: 3px;
    color: #594519;
    letter-spacing: -1px;
  }
  .envelope .c1 span{
    font-weight: bold;
    font-size: .9rem;
    letter-spacing: -1px;
  }
  .envelope .c1 span:before{
    content: '￥';
    font-size: .5rem;
  }
  .envelope .c2{
    font-size: .65rem;
    margin-right: 15px;
  }

  .c2 .icon {
    font-size: .9rem;
  }
  .envelope p:before,.envelope p:after{
    content: '';
    position: absolute;
    width: .3rem;
    height: .3rem;
    border-radius: .15rem;
    right: 38px;
    background-color: #fff;
  }
  .envelope p:after{
    bottom: -.15rem;
  }
  .envelope p:before{
    top: -.15rem;
  }
  .envelope .shop_envelope{
    margin-left: .7rem;
    background-color: #fff4f4;
  }
  .envelope .c3{
    margin-right: 10px;
  }
  .header_content .active{
    display: flex;
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
    justify-content: space-between;
    font-size: .65rem;
    line-height: 1rem;
    text-align: left;
    align-items: center;
  }
  .active .ac1{
    background-color: rgb(240, 115, 115);
    color: #fff;
    padding:0 1px;
    display: inline-block;
  }
  .active .ac2{
    font-size: .7rem;
    margin-left: 5px;
  }
  .spread{
    min-width: 25%;
    text-align: right;
  }
  .spread span{
    color: #999;
    margin-right: 5px;
  }
  .spread img{
    width: .65rem;
    position: relative;
    top: -2px;
  }
  .ad_info{
    font-size: .65rem;
    width: 80%;
    margin:5px auto 20px;
    color: #999;
  }

  /*点击活动，红包弹出框*/
  /*.active_click_wrap,.envelope_click_wrap{
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
  .active_content h2,.envelope_content h2{
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
  .active_click_wrap .wrap,.envelope_click_wrap .wrap{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.3);
  }
    !*红包*!
  .envelope_info h2*/


  @keyframes bounce-in{
    0%{transform:scale(0);}
    100%{transform:scale(1);}
  }
</style>


<template>
  <transition name="bounce"><!--商品详情页面-->
    <div v-if="oneFoodInfoShow" class="one_food_info">
    <div class="photo">
      <img :src="$parent.getImagePath({image_hash:showFoodInfo.image_path,suffix:'x-oss-process=image/resize,m_lfit,w_377,h_377/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp'})">
      <span @click="closeOneFoodInfo">×</span>
    </div>
    <div class="info">
      <h2 class="ellipsis">{{showFoodInfo.name}}</h2>
      <div class="rating">
        <p class="ellipsis">
          <span>月售{{showFoodInfo.month_sales}}份</span>
          <span v-if="showFoodInfo.satisfy_rate!=0">好评率{{showFoodInfo.satisfy_rate}}%</span>
        </p>
      </div>
      <div class="row4">
        <div class="row4_left">
          <span>{{showFoodInfo.lowest_price}}<small v-if="showFoodInfo.specfoods.length>=2">起</small></span>
          <span v-if="showFoodInfo.specfoods[0].activity" class="discount" >
                      <del>{{showFoodInfo.specfoods[0].original_price}}</del>
                      <span class="dis">{{$parent.getDiscount(showFoodInfo.specfoods[0].original_price,showFoodInfo.specfoods[0].price)}}折</span>
                      <span v-if="showFoodInfo.specfoods[0].activity!=null">{{showFoodInfo.specfoods[0].activity.applicable_quantity_text}}</span>
                    </span>
        </div>
        <div class="row4_right">
          <CartBar :food="showFoodInfo" ></CartBar>
        </div>
      </div>
      <div class="text_desc">
        <p>{{showFoodInfo.description}}</p>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
  import CartBar from '../CartBar/CartBar'
    export default {
      data(){
        return{
          oneFoodInfoShow:false
        }
      },
      props:{
        showFoodInfo:Object
      },
      methods:{
        closeOneFoodInfo() {//关闭食品详情页
          this.oneFoodInfoShow = false
        },
      },
      components:{
        CartBar,
      }
    }
</script>

<style scoped>
  .one_food_info .rating{
    margin-top: 3px;
    font-size: .6rem;
    color: #999;
  }
  .one_food_info .discount{
    margin-top: 3px;
    font-size: .6rem;
    color: #f07373;
    min-height: 1rem;
  }
  .one_food_info .discount .dis{
    font-size: .6rem;
    border: .5px solid #f07373;
    display: inline-block;
    padding: 0 1px;
  }
  .one_food_info .row4{
    display: flex;
    justify-content: space-between;
    font-size: .95rem;
    color: #333;
  }
  .one_food_info .row4_left{
    letter-spacing: -1px;
    color: red;
    word-spacing: 1px;
    padding-top: 5px;
    min-width: 50%;
  }
  .one_food_info .row4_left small{
    font-size: .65rem;
  }
  .one_food_info .row4_left:before{
    content: '￥';
  }
  .one_food_info .row4_right p{
    padding-top: 2px;
    display: flex;
  }
  .one_food_info .row4_right span{
    width: 1rem;
    text-align: center;
    line-height: 1.5rem;
  }
  .one_food_info .row4_right .icon{
    font-size: 1.5rem;
  }
  /*食品详情*/
  .one_food_info{
    position: fixed;
    height: 100%;
    left: 0;
    width: 100%;
    bottom: 0;
    z-index: 10;
    background-color: #fff;
  }
  .one_food_info .photo{
    position: relative;
  }
  .one_food_info .photo img{
    width: 100%;
  }
  .one_food_info .photo span{
    position: absolute;
    right: 1rem;
    top: 1rem;
    color: #fff;
    font-size: 2.5rem;
    font-weight: lighter;
    height: 2rem;
    width: 2rem;
    text-align: center;
    line-height: 2rem;
    background: rgba(0,0,0,.2);
    border-radius: 50%;
  }
  .one_food_info .discount{
    letter-spacing: normal;
    margin-left: .5rem;
    font-size: .7rem;
  }
  .one_food_info .discount .dis{
    position: relative;
    top: -1px;
  }
  .one_food_info .discount del,.info_right .row4_left del{
    color: #999;
    font-size: .8rem;
  }
  .one_food_info .discount del:before{
    content: '￥';
    color: #999;
    font-size: .8rem;
    margin-right: -2px;
  }
  .one_food_info .row4_left{
    display: flex;
    align-items: baseline;
  }
  .one_food_info .info{
    padding:.7rem 1rem;
  }
  .one_food_info .info h2{
    font-size: 1.25rem;
  }
  .one_food_info .rating{
    font-size: .7rem;
    color: #666;
  }
  .one_food_info .row4{
    margin: .7rem 0;
  }
  .one_food_info .text_desc{
    font-size: .65rem;
    color: #666;
  }

  /*点击展开活动动画*/
  .bounce-enter{
    height: 0px;
  }
  .bounce-enter-active{
    transition:height .3s;
  }
  .bounce-leave{
    /*height: 100%;*/
  }
  .bounce-leave-active{
    height: 0;
    transition:height .3s;
  }
</style>

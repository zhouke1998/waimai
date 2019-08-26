<!-- 显示的商品信息组件 -->
<template>
  <li class="one_food" @click="$parent.showOneFoodInfo(index1,index2)">
    <div v-if="one.image_path" class="info_left">
                      <span>
                      <img
                        v-lazy.food_type_list="$parent.getImagePath({image_hash:one.image_path,suffix:'x-oss-process=image/resize,m_lfit,w_141,h_141/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp'})"/>
                    </span>
    </div>
    <div class="info_right">
      <div class="row1">
        <p class="ellipsis">{{one.name}}</p>
      </div>
      <div class="row2">
        <p class="ellipsis">{{one.description}}</p>
      </div>
      <div class="row3">
        <p class="ellipsis">
          <span>月售{{one.month_sales}}份</span>
          <span v-if="one.satisfy_rate!=0">好评率{{one.satisfy_rate}}%</span>
        </p>
      </div>
      <div class="row_act">
        <p>
          <span v-if="one.specfoods[0].activity">{{$parent.getDiscount(one.specfoods[0].original_price,one.specfoods[0].price)}}折</span>
          <span v-if="one.specfoods[0].activity!=null">{{one.specfoods[0].activity.applicable_quantity_text}}</span>
        </p>
      </div>
      <div class="row4">
        <div class="row4_left">
          <span>{{one.lowest_price}}</span>
          <span v-show="one.specfoods.length>1" class="qi">起</span>
          <del v-if="one.specfoods[0].original_price">￥{{one.specfoods[0].original_price}}</del>
        </div>
        <div class="row4_right">
          <CartBar :food="$parent.foodShopInfo.menu[index1].foods[index2]" ></CartBar>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
  import CartBar from '../CartBar/CartBar'
    export default {
      name: "OneFoodBar",
      props:{
        one:Object,
        index1:Number,
        index2:Number,
      },
      components:{
        CartBar:CartBar,
      }
    }
</script>

<style scoped>
  .one_food{
    margin: 10px 0;
    display: flex;
    justify-content: flex-start;
    position: relative;
  }
  .one_food:last-child{
    margin-bottom: 0;
  }
  .info_left{
    width: 35%;
    min-width: 35%;
    margin-right: 10px;
  }
  .one_list .info_left img{
    width: 100%;
  }
  .info_right{
    overflow: hidden;
    width: 100%;
  }
  .info_right .row1{
    font-size: .9rem;
    font-weight: bold;
    color: #333;
  }
  .info_right .row2,.info_right .row3,.one_food_info .rating{
    font-size: .6rem;
    color: #999;
    /*padding: 2px 0;*/
  }
  .info_right .row_act,.one_food_info .discount{
    margin-top: 3px;
    font-size: .6rem;
    color: #f07373;
    min-height: 1rem;
  }
  .info_right .row_act span:first-child,.one_food_info .discount .dis{
    font-size: .6rem;
    border: .5px solid #f07373;
    display: inline-block;
    padding: 0 1px;
  }
  .info_right .row4 .qi{
    font-size: .65rem;
  }
  .info_right .row4,.one_food_info .row4{
    display: flex;
    justify-content: space-between;
    font-size: .95rem;
    color: #333;
  }
  .info_right .row4_left,.one_food_info .row4_left{
    letter-spacing: -1px;
    color: red;
    word-spacing: 1px;
    padding-top: 5px;
    min-width: 50%;
  }
  .info_right .row4_left:before,.one_food_info .row4_left:before{
    content: '￥';
  }
  .info_right .row4_right p,.one_food_info .row4_right p{
    /*padding-top: 2px;*/
    display: flex;
  }
  .info_right .row4_right span,.one_food_info .row4_right span{
    width: 1rem;
    text-align: center;
    line-height: 1.5rem;
  }
  .info_right .row4_right .icon,.one_food_info .row4_right .icon{
    font-size: 1.5rem;
  }
  .row4_left del{
    font-size: .75rem;
    color: #999;
    font-weight: lighter;
    margin-left: 3px;
  }
</style>

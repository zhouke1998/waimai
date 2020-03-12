<template>
  <section v-if="restaurant.restaurant" class="shop_item">
    <div class="content_top">
      <div class="shop_ico">
        <i><img :src="getImage(restaurant.restaurant.image_path)"/></i>
      </div>
      <div class="shop_info">
        <div class="row1">
          <h3><i v-show="restaurant.restaurant.is_premium">品牌</i><span
            class="ellipsis">{{restaurant.restaurant.name}}</span></h3>
          <span v-if="$parent.mark_num" @click.stop="show_mark(restaurant.index_0)">···</span>
        </div>
        <div class="row2">
          <p class="ellipsis">
            <Star :size="size" :rating="restaurant.restaurant.rating"/>
            <b>{{restaurant.restaurant.rating}}</b>
            <span>月售{{restaurant.restaurant.recent_order_num}}单</span>
          </p>
        </div>
        <div class="row3">
          <div class="left_info">
            <span class="qisong">￥{{restaurant.restaurant.float_minimum_order_amount}}起送</span>
            <span class="peisongfei">配送费约￥{{restaurant.restaurant.float_delivery_fee}}</span>
          </div>
          <div class="rig_info">
            <span class="distance">{{getDistance(restaurant.restaurant.distance)}}</span>
            <span class="time_spend">{{restaurant.restaurant.order_lead_time}}分钟</span>
          </div>
        </div>
      </div>
    </div>
    <div class="desc_bottom" style=" ">
      <div class="row4">
        <span v-for="support_tag in restaurant.restaurant.support_tags">{{support_tag.text}}</span>
        <span v-show="restaurant.restaurant.recommend.reason" class="special">
                    <img
                      src="https://fuss10.elemecdn.com/a/c1/24c767ffa7fd296d3e2d6f01798c6png.png?x-oss-process=image/format,webp/resize,w_10,h_10,m_fixed">
                    <span>{{restaurant.restaurant.recommend.reason}}</span>
                  </span>
      </div>
      <div class="desc">
        <div class="desc_left">
          <div v-for="(activity,index) in restaurant.restaurant.activities"
               v-show="index<($parent.show_num[restaurant.index_0]==undefined?2:$parent.show_num[restaurant.index_0])"
               class="desc_wrap">
                    <span class="bg_wrap">
                      <span :style="{backgroundColor:'#'+activity.icon_color}">
                        {{activity.icon_name}}
                      </span>
                    </span>
            <span class="desc_tag ellipsis">{{activity.tips}}</span>
          </div>
          <div v-for="support in restaurant.restaurant.supports"
               v-show="restaurant.restaurant.activities.length<($parent.show_num[restaurant.index_0]==undefined?2:$parent.show_num[restaurant.index_0])"
               class="desc_wrap">
                    <span class="bg_wrap">
                      <span :style="{backgroundColor:'#'+support.icon_color}">
                        {{support.icon_name}}
                      </span>
                    </span>
            <span class="desc_tag ellipsis">{{support.description}}</span>
          </div>
        </div>
        <!--点击展开@click="spread(index_0)-->
        <div class="spread" @click.stop="changeShow_num(restaurant.index_0)">
          <span>{{restaurant.restaurant.activities.length+restaurant.restaurant.supports.length}}个活动</span>
          <img :class="{rotate_180:$parent.show_num[restaurant.index_0]===10}"
               src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjOTk5IiBkPSJNNC41NzcgNS40MjNjLjc5Ljc3IDIuMDczLjc2NyAyLjg1NyAwbDQuMTItNC4wMjZDMTIuMzQ1LjYyNSAxMi4wOSAwIDEwLjk4NSAwSDEuMDI3Qy0uMDc3IDAtLjMzLjYzLjQ1NyAxLjM5N2w0LjEyIDQuMDI2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Star from '../../Star/Start'
  import {getImagePath} from "../../../utils/getImagePath";

  export default {
    name: "ShopCover",
    data() {
      return {
        size: 24,//星星的大小尺寸
      }
    },
    components: {
      Star,
    },
    props: {
      restaurant: Object,
    },
    methods: {
      getImage(image_hash) {
        return getImagePath({image_hash, suffix: "imageMogr/format/webp/thumbnail/!62x62r/gravity/Center/crop/62x62/"})
      },
      getDistance(distance) {
        return distance > 1000 ? (parseInt(distance / 10) / 100 + 'km') : distance + 'm'
      },
      /*点击显示mark*/
      show_mark(index) {
        let temp = []
        temp[index] = true
        this.$parent.mark_num = temp
      },
      /*改变显示或隐藏*/
      changeShow_num(index) {
        let show = this.$parent.show_num[index]
        let temp = [...this.$parent.show_num]//替换原数组，以达到更新
        if (show == undefined) {
          temp[index] = 10 //显示的个数
        } else if (show == 2) {
          temp[index] = 10
        } else {
          temp[index] = 2
        }
        this.$parent.show_num = temp
      },
      /*点击展开*/
      /*spread(index){
        let temp = [...this.$parent.rotate]
        temp[index] = !temp[index]
        this.rotate = temp
      },*/
    }
  }
</script>

<style scoped>
  .shop_item .content_top {
    display: flex;
  }

  .shop_item .shop_ico img {
    width: 62px;
    height: 62px;
    border: 1px solid rgba(0, 0, 0, .08);
    box-sizing: border-box;
  }

  .shop_item .shop_info {
    padding-left: 10px;
    flex: 1;
    overflow: hidden;
  }

  .shop_info > div, .desc > div {
    overflow: hidden;
  }

  .row1, .row3 {
    display: flex;
    justify-content: space-between;
  }

  .row2, .row3 {
    margin-top: 4px;
  }

  .shop_item h3 {
    height: 20px;
    overflow: hidden;
    display: flex;
    line-height: 20px;
  }

  .shop_item h3 i {
    font-style: normal;
    font-size: 0.7rem;
    background-color: #ffd923;
    border-radius: 2px;
    margin-right: 5px;
    white-space: nowrap;
  }

  .shop_item h3 span {
    color: #333;
  }

  .shop_item .row1 > span {
    padding: 0 5px;
    margin-left: 5px;
  }

  /*!*星星评价*!
  .shop_item .row2 i{
    display: inline-block;
    height: 9px;
    width: 10px;
    background-size: 10px 9px;
    background-image: url("./img/starts/star24_off@2x.png");
  }
  .shop_item .row2 .star1{
    background-image: url("./img/starts/star24_on@2x.png");
  }
  .shop_item .row2 .star0_1{
    background-image: url("./img/starts/star24_half@2x.png");
  }*/
  .shop_item .row2 p {
    height: 20px;
  }

  .shop_item .row2 b, .shops .row2 span {
    color: #666;
    font-size: .65rem;
  }

  .row3 {
    font-size: .65rem;
    color: #666;
  }

  .row3 .qisong:after, .row3 .distance:after {
    content: '|';
    margin: 0 .2rem;
    color: #ddd;
  }

  .row4 {
    padding-bottom: 10px;
    border-bottom: 0.5px solid #eeeeee;
  }

  .row4 .special {
    border: none !important;
  }

  .shop_item .row4 > span {
    border: 1px solid #ccc;
    color: #555;
    font-size: .65rem;
    margin-right: .3rem;
  }

  .row4 .special img {
    position: relative;
    top: 2px;
  }

  .desc_bottom {
    padding-left: 70px;
    box-sizing: border-box;
    margin-top: 5px;
  }

  .desc {
    font-size: .7rem;
    color: #666;
    margin-top: .5rem;
    display: flex;
  }

  .desc .bg_wrap span {
    background-color: rgb(240, 115, 115);
    color: #fff;
    display: inline-block;
    width: .9rem;
    height: .9rem;
    text-align: center;
    margin-right: .5rem;
    border-radius: 3px;
  }

  /*.desc .bg_wrap:after{
    content: '';
    margin-right: 5px;
  }*/
  .desc_left {
    flex: 1;
  }

  .spread {
    padding: .3rem .3em 0 .5rem;
    align-items: center;
    text-align: right;
  }

  .desc_wrap {
    display: flex;
    margin-top: .2rem;
  }

  .none {
    display: none;
  }

  .spread img {
    transition: all .2s ease-in-out;
    vertical-align: middle;
  }

  .rotate_180 {
    transform: rotate(180deg);
  }
</style>

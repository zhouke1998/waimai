<template>
  <div class="shops">
    <h2>
      <a>
        <span class="iconfont icon-tuanduicankaoxian-2 fujin"></span>
        附近商家
      </a>
    </h2>
    <ul v-loading="loading" class="item_list">
      <li  v-for="(restaurant,index_0) in getRestaurants" :shop_index="index_0" @click="$router.push(`/restaurant?id=${restaurant.id}`)">
        <section class="shop_item">
          <div class="content_top">
            <div class="shop_ico">
              <i><img :src="getImage(restaurant.image_path)" /></i>
            </div>
            <div class="shop_info">
              <div class="row1">
                <h3><i v-show="restaurant.is_premium">品牌</i ><span class="ellipsis">{{restaurant.name}}</span></h3>
                <span @click.stop="show_mark(index_0)">···</span>
              </div>
              <div class="row2">
                <p class="ellipsis">
                  <Star :size="size" :rating="restaurant.rating" />
                  <b>{{restaurant.rating}}</b>
                  <span>月售{{restaurant.recent_order_num}}单</span>
                </p>
              </div>
              <div class="row3">
                <div class="left_info">
                  <span class="qisong">￥{{restaurant.float_minimum_order_amount}}起送</span>
                  <span class="peisongfei">配送费约￥{{restaurant.float_delivery_fee}}</span>
                </div>
                <div class="rig_info">
                  <span class="distance">{{getDistance(restaurant.distance)}}</span>
                  <span class="time_spend">{{restaurant.order_lead_time}}分钟</span>
                </div>
              </div>
            </div>
          </div>
          <div class="desc_bottom" style=" ">
            <div class="row4">
              <span v-for="support_tag in restaurant.support_tags" >{{support_tag.text}}</span>
              <span v-show="restaurant.recommend.reason" class="special">
                  <img src="https://fuss10.elemecdn.com/a/c1/24c767ffa7fd296d3e2d6f01798c6png.png?imageMogr/format/webp/thumbnail/!12x12r/gravity/Center/crop/20x20/">
                  <span>{{restaurant.recommend.reason}}</span>
                </span>
            </div>
            <div class="desc">
              <div class="desc_left">
                <div v-for="(activity,index) in restaurant.activities" v-show="index<(show_num[index_0]==undefined?2:show_num[index_0])" class="desc_wrap">
                  <span class="bg_wrap">
                    <span :style="{backgroundColor:'#'+activity.icon_color}">
                      {{activity.icon_name}}
                    </span>
                  </span>
                  <span class="desc_tag ellipsis">{{activity.tips}}</span>
                </div>
                <div v-for="support in restaurant.supports" v-show="restaurant.activities.length<(show_num[index_0]==undefined?2:show_num[index_0])" class="desc_wrap">
                  <span class="bg_wrap">
                    <span :style="{backgroundColor:'#'+support.icon_color}">
                      {{support.icon_name}}
                    </span>
                  </span>
                  <span class="desc_tag ellipsis">{{support.description}}</span>
                </div>
              </div>
              <!--点击展开@click="spread(index_0)-->
              <div class="spread" @click.stop="spread(index_0);changeShow_num(index_0)">
                <span>{{restaurant.activities.length+restaurant.supports.length}}个活动</span>
                <img :class="{rotate_180:rotate[index_0]}" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjOTk5IiBkPSJNNC41NzcgNS40MjNjLjc5Ljc3IDIuMDczLjc2NyAyLjg1NyAwbDQuMTItNC4wMjZDMTIuMzQ1LjYyNSAxMi4wOSAwIDEwLjk4NSAwSDEuMDI3Qy0uMDc3IDAtLjMzLjYzLjQ1NyAxLjM5N2w0LjEyIDQuMDI2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+" />
              </div>
            </div>
          </div>
        </section>
        <!--点击本身关闭mark层-->
        <div class="mark" @click.stop="shut_mark()" v-show="mark_num[index_0]">
          <span @click.stop="doNotLike(index_0)">不喜欢</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {reqRestaurants} from '../../api/index'
  import Star from '../Star/Start'
  import {getImagePath} from "../../utils/getImagePath";

  export default {
      name: "ShopList",
      data(){
          return{
            restaurants:[],//存储餐馆信息
            page:0, //页数
            limit:8, //每页的个数
            show_num:[], //存储点击展开
            mark_num : [],//存储点击不喜欢
            rotate:[],//点击存储旋转
            loading: true,//
            size:24,//星星的大小尺寸
          }
      },
      components:{
        Star,
      },
      watch:{
        page(){
          let offset = (this.page-1)*this.limit
          reqRestaurants(offset,this.limit)
            .then(data=>{
              if(data.status===0){
                for(let restaurant of data.restaurants){
                  this.restaurants.push(restaurant)
                }
              }
            })
        },
        FirstPage(value){
          this.loading = false
          this.page = 1//value===0?1:0
        },
      },
      mounted(){
        if(this.$store.state.address.status===0){ //判断是否获取过地址
          this.loading = false
          this.page=1
        }
        window.addEventListener('scroll', this.handleScroll)//滑动事件，滑动关闭不喜欢
      },
      computed:{
        getRestaurants(){
          return this.restaurants
        },
        FirstPage(){
          return this.$store.state.address.status
        },
      },
      methods:{
        getImage(image_hash){
          return getImagePath({image_hash,suffix:"imageMogr/format/webp/thumbnail/!62x62r/gravity/Center/crop/62x62/"})
        },
        getDistance(distance){
          return distance>1000?(parseInt(distance/10)/100+'km'):distance+'m'
        },
        /*改变显示或隐藏*/
        changeShow_num(index){
          let show = this.show_num[index]
          let temp = [...this.show_num]//替换原数组，以达到更新
          if(show==undefined){
            temp[index] = 10
          }else if(show==2){
            temp[index] = 10
          }else{
            temp[index] = 2
          }
          this.show_num = temp
        },
        /*滑动隐藏mark*/
        handleScroll () {
          //var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          //console.log(scrollTop)
          this.mark_num = []
        },
        /*点击显示mark*/
        show_mark(index){
          let temp  = []
          temp[index]=true
          this.mark_num = temp
        },
        /*点击mark关闭*/
        shut_mark(){
          this.mark_num = []
        },
        /*点击不喜欢按钮*/
        doNotLike(index){
          this.restaurants.splice(index,1)
          this.show_num.splice(index,1)
          this.rotate.splice(index,1)
            this.mark_num = []
          setTimeout(()=>{
            const h = this.$createElement;
            this.$message({
              message: h('p', {}, [
                h('span', { style: 'color: #000' }, '已将商家置于最后')
              ]),
              center: true
            });
          },300)
        },
        /*点击展开*/
        spread(index){
          let temp = [...this.rotate]
          temp[index] = !temp[index]
          this.rotate = temp
        },
      },
      destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
      },
      restaurant_click(){
        this.$router.push('/restaurant/home')
      }
    }

</script>

<style scoped>
  .shops h2{
    height: 40px;
    line-height: 40px;
    color: #aaa;
    font-size: 0.75rem;
    font-weight: lighter;
  }
  .item_list{
    padding-bottom: 70px;
    height: 300px;
  }
  .item_list li{
    padding: 10px;
    border-bottom: 1px solid #dddddd;
    position: relative;
  }
  .mark{
    position: absolute;
    background: rgba(0,0,0,.5);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mark span{
    width: 50px;
    height: 50px;
    border-radius: 25px;
    text-align: center;
    background: #fff;
    color: #333;
    z-index: 2;
    line-height: 50px;
    font-size: .7rem;
  }
  .shops .content_top{
    display: flex;
  }
  .shops .shop_ico img{
    width: 62px;
    height: 62px;
    border: 1px solid rgba(0,0,0,.08);
    box-sizing: border-box;
  }
  .shops .shop_info{
    padding-left: 10px;
    flex: 1;
    overflow: hidden;
  }
  .shop_info>div,.desc>div{
    overflow: hidden;
  }
  .row1,.row3{
    display: flex;
    justify-content: space-between;
  }
  .row2,.row3{
    margin-top: 4px;
  }
  .shops h3{
    height: 20px;
    overflow: hidden;
    display: flex;
    line-height: 20px;
  }
  .shops h3 i{
    font-style: normal;
    font-size: 0.7rem;
    background-color: #ffd923;
    border-radius: 2px;
    margin-right: 5px;
    white-space: nowrap;
  }
  .shops h3 span{
    color: #333;
  }
  .shops .row1>span{
    padding: 0 5px;
    margin-left: 5px;
  }
  /*!*星星评价*!
  .shops .row2 i{
    display: inline-block;
    height: 9px;
    width: 10px;
    background-size: 10px 9px;
    background-image: url("./img/starts/star24_off@2x.png");
  }
  .shops .row2 .star1{
    background-image: url("./img/starts/star24_on@2x.png");
  }
  .shops .row2 .star0_1{
    background-image: url("./img/starts/star24_half@2x.png");
  }*/
  .shops .row2 p{
    height: 20px;
  }
  .shops .row2 b,.shops .row2 span{
    color: #666;
    font-size: .65rem;
  }
  .row3{
    font-size: .65rem;
    color: #666;
  }
  .row3 .qisong:after,.row3 .distance:after{
    content: '|';
    margin: 0 .2rem;
    color: #ddd;
  }
  .row4{
    padding-bottom: 10px;
    border-bottom: 0.5px solid #eeeeee;
  }
  .row4 .special{
    border: none !important;
  }
  .shops .row4>span{
    border: 1px solid #ccc;
    color: #555;
    font-size: .65rem;
    margin-right: .3rem;
  }

  .row4 .special img{
    position: relative;
    top: 2px;
  }
  .desc_bottom{
    padding-left: 70px;
    box-sizing: border-box;
    margin-top: 5px;
  }
  .desc{
    font-size: .7rem;
    color: #666;
    margin-top: .5rem;
    display: flex;
  }
  .desc .bg_wrap span{
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
  .desc_left{
    flex:1;
  }
  .spread{
    padding: .3rem .3em 0 .5rem;
    align-items: center;
    text-align: right;
  }
  .desc_wrap{
    display: flex;
    margin-top: .2rem;
  }
  .none{
    display: none;
  }
  .spread img{
    transition: all .2s ease-in-out ;
    vertical-align: middle;
  }
  .rotate_180{
    transform: rotate(180deg);
  }
</style>

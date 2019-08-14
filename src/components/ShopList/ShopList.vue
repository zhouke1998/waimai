<template>
  <div class="shops">
    <slot name="header"></slot>
    <ul class="item_list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isGettingShop"
        infinite-scroll-distance="30">
      <li v-for="(restaurant,index_0) in restaurants" :shop_index="index_0"
          @click="enterRestaurant(restaurant.id)">
        <div>
          <ShopCover :restaurant="{restaurant,index_0}"></ShopCover>
          <!--点击本身关闭mark层-->
          <div class="mark" @click.stop="shut_mark()" v-show="mark_num[index_0]">
            <span @click.stop="doNotLike(index_0)">不喜欢</span>
          </div>
        </div>
      </li>
      <div style="display: flex; justify-content: center; margin-top: 20px">
        <mt-spinner v-show="isGettingShop" color="#02a774" :size="40" type="fading-circle"></mt-spinner>
        <p style="text-align: center" v-show="daodile">已经到底了...</p>
      </div>
    </ul>
  </div>
</template>

<script>
  import {reqRestaurants} from '../../api/index'
  import ShopCover from './ShopCover/ShopCover'
  import {Toast} from 'mint-ui'

  export default {
      name: "ShopList",
      data(){
          return{
            restaurants:[],//存储餐馆信息
            page:0, //页数
            limit:8, //每页的个数
            show_num:[], //存储点击展开
            mark_num : [],//存储点击不喜欢
            //rotate:[],//点击存储旋转
            isGettingShop: true,//
            daodile: false,
          }
      },
      components:{
        ShopCover,
      },
      watch:{
        FirstPage() {
          this.page = 1//value===0?1:0
          this.getRestaurants(1)
        },
      },
      mounted(){
        if(this.$store.state.address.status===0){ //判断是否获取过地址
          this.getRestaurants(1)
          this.page=1
        }
        window.addEventListener('scroll', this.handleScroll)//滑动事件，滑动关闭不喜欢
      },
      computed:{
        FirstPage(){
          return this.$store.state.address.status
        },
      },
      methods:{
        /*滑动隐藏mark*/
        handleScroll () {
          //var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          //console.log(scrollTop)
          this.mark_num = []
        },
        /*点击mark关闭*/
        shut_mark(){
          this.mark_num = []
        },
        /*点击不喜欢按钮*/
        doNotLike(index){
          this.restaurants.splice(index,1)
          this.show_num.splice(index,1)
            this.mark_num = []
          Toast({
            message: '已将商家置于最后！',
            position: 'middle',
            duration: 1000
            });
        },
        //获取restaurant
        getRestaurants(page) {
          this.isGettingShop = true
          let offset = (page - 1) * this.limit
          reqRestaurants(offset, this.limit)
            .then(data => {
              if (data.status === 0) {
                if (data.restaurants.length < 1) {
                  this.daodile = true
                } else {
                  for (let restaurant of data.restaurants) {
                    this.restaurants.push(restaurant)
                  }
                }
                this.isGettingShop = false
              }
            }).catch(() => {
            this.isGettingShop = false
          })
        },
        loadMore() {
          if (!this.isGettingShop && !this.daodile) {
            this.getRestaurants(++this.page)
          }
        },
        enterRestaurant(restaurant_id){
          if(restaurant_id===this.$store.state.foodsShop.restaurant_id){

          }else{
            this.$store.dispatch('clearCartFoods')
          }
          this.$router.push(`/restaurant?id=${restaurant_id}`)
        }
      },
      destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
      },
    }

</script>

<style scoped>
  .shops h2{
    height: 40px;
    line-height: 40px;
    color: #aaa;
    font-size: 0.75rem;
    font-weight: lighter;
    padding-left: 10px;
  }
  .item_list{
    padding-bottom: 70px;
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

</style>

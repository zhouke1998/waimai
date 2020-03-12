<template>
  <section style="scroll-behavior:smooth">

    <div class="content" :style="{height:contentHeight}" >
      <aside class="food_type_nav" >
        <ul>
          <li v-for="(item,index1) in foodShopInfo.menu" :class="{active:index1==foodNavActiveIndex}" :index1="index1"  @click="foodTypeNavClick(index1)"><!--class="active"-->
            <i class="ico"><img v-if="item.icon_url" :src="getImagePath({image_hash:item.icon_url,suffix:'imageMogr/format/webp/thumbnail/26x/'})"> </i>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </aside>
      <div class="food_content">
        <div @touchstart="touchStart()" @touchmove="touchMove()" @scroll="foodListScroll" id="food_type_list"
             class="food_type_list" ref="food_type_list">
          <ul id="ul1">
            <li v-for="(oneList,index1) in foodShopInfo.menu" :index1="index1" class="one_list">
              <div class="list_header">
                <h4 class="ellipsis">{{oneList.name}}</h4>
                <span class="ellipsis">{{oneList.description}}</span>
              </div>
              <div class="list">
                <ul>
                  <OneFoodBar v-for="(one,index2) in oneList.foods" :key="index2" :index1="index1" :index2="index2" :one="one" />
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <OneFoodInfoWrap :showFoodInfo="showFoodInfo" ref="oneFoodInfoShow"></OneFoodInfoWrap> <!--商品详情页面-->
        <SelectFoodSpec :foodInfo="showFoodInfo" ref="selectFoodShow" ></SelectFoodSpec><!--选择食品规格-->
      </div>
      <div class="bottom_cart">
        <div class="trans_wrap" :class="{trans_wrap_active:isOpenCart}">
          <div class="tips">
            <p v-if="foodShopInfo.rst && foodShopInfo.rst.activities[0].attribute && getTotalCount===0" class="ellipsis">{{foodShopInfo.rst.activities[0].description}}</p>
            <p v-else-if="getOriginalTotalPrice.total<20 && getTotalCount>0">还差<span style="color: red">{{formateMoney(20-Number(getOriginalTotalPrice.total))}}</span>元起送</p>
            <p v-else-if="getOriginalTotalPrice.total>=20 && getOriginalTotalPrice.isDiscount">已减{{formateMoney(getOriginalTotalPrice.total-getTotalPrice)}}元</p>
            <p v-else-if="getTotalCount>0 && foodShopInfo.rst.activities[0].attribute && !getOriginalTotalPrice.isDiscount">
              <span v-if="manjian.yijian">已减{{manjian.yijian}}</span>
              <span v-if="manjian.nextjian>0">再买
                  <span style="color: red">{{manjian.haicha}}</span>
                  元减{{manjian.nextjian}}
                </span>
            </p>
          </div>
          <div class="cart_info" :style="{opacity:timeOutOpacity}">
            <div class="head">
              <span>已选商品</span>
              <span @click="clearCartFoods">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-tuanduicankaoxian-8"></use>
                </svg>
                <span class="cart_clear_text">清空</span>
              </span>
            </div>
            <div :style="{maxHeight:cartListHeight}" class="cart_list">
              <ul>
                <li v-for="(food,index1) in cartFoods" :index1="index1">
                  <div class="cart_food_name">
                    <p class=" ellipsis">
                      {{food.name}}<br/>
                    </p>
                    <em v-if="food.attrs.length">{{food.attrs[0].values[food.attr]}}</em><em v-if="food.specfoods.length>1">{{food.specifications[0].values[food.spec]}}</em>
                  </div>
                  <div class="right_info">
                    <del v-if="food.specfoods[0].original_price">￥{{getOneTypePrice(true,food)}}</del>
                    <span class="cart_food_price"><small>￥</small>{{getOneTypePrice(false,food)}}</span>
                    <CartBar :food="food" ></CartBar>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="main">
            <span :class="{cart_ico_active:getTotalCount,cart_ico:true,animate1:cartAnimate===1,animate2:cartAnimate===2,animate3:cartAnimate===3}" @click="openCart()">
              <i></i>
              <span v-show="getTotalCount" class="number">{{getTotalCount}}</span>
            </span>
          <div class="main_left">
            <h3 v-if="getTotalCount">{{formateMoney(getTotalPrice)}}
              <del v-show="Number(getTotalPrice)<getOriginalTotalPrice.total">
                {{formateMoney(getOriginalTotalPrice.total)}}
              </del>
            </h3>
            <p v-if="getTotalCount===0" class="nothing">未选购商品</p>
            <p v-if="foodShopInfo.rst">另需配送费{{foodShopInfo.rst.float_delivery_fee || '1'}}元</p>
          </div>
          <div :class="{main_right:true,delivery_active:getOriginalTotalPrice.total>=20}">
            <span class="mode1" v-if="getTotalCount===0">￥20起送</span>
            <span class="mode2" v-if="getOriginalTotalPrice.total<20 && getTotalCount>0">还差￥{{formateMoney(20-getOriginalTotalPrice.total)}}起送</span>
            <span class="mode3" @click="pay" v-if="getOriginalTotalPrice.total>=20">去结算</span>
          </div>
        </div>
        <div class="cart_info_mask" @click="openCart" v-show="isOpenCart"></div>
      </div>
    </div>
  </section>
</template>

<script>
  import {getImagePath,formateMoney} from "../../utils/getImagePath";
  import OneFoodInfoWrap from './OneFoodInfo/OneFoodInfo'
  import SelectFoodSpec from './SelectFoodSpec/SelectFoodSpec'
  import OneFoodBar from './OneFoodBar/OneFoodBar'
  import {mapState,mapGetters} from 'vuex'
  import CartBar from './CartBar/CartBar'
  export default {
    data(){
      return{
        startY:0, //存储滑动初始坐标
        isScrollOk:false,
        cartListHeight:'', //购物车弹出的高度
        oneFoodInfoShow:false, //是否打开一种物品的详情
        showFoodInfo:{},
        foodTypeHeight:[0],//存储每个食物分类的高度
        foodNavActiveIndex:0,//存储食物分类导航active索引
        isOpenCart:false,
        timeOutOpacity:0,//默认购物车详情cart_info透明度
        //cartAnimate:0 //购物车图标动画，0代表原始，1代表缩小，2代表放大
      }
    },
    watch:{
      foodShopInfo(){
        this.$nextTick(()=>{this.getFoodTypeHeight()})
      },
      cartFoods(){
        if(this.cartFoods.length<=0){
          this.openCart()
        }
      }
    },
    mounted(){
      this.cartListHeight = (screen.height-100)/2+'px' //计算购物车的高度
      //this.addCartFood({isAdd:true,index1:1,index2:1})
      if(this.foodShopInfo.restaurant_id){
        this.getFoodTypeHeight()
      }
      const element = document.documentElement|| document.body
      element.scrollTop = 0
    },
    props:{
      contentHeight:String,
    },
    computed:{
      ...mapState({foodShopInfo:'foodsShop',cartFoods: 'cartFoods',cartAnimate:'cartAnimate'}),
      ...mapGetters({getTotalPrice:'getTotalPrice',getOriginalTotalPrice:'getOriginalTotalPrice',getTotalCount:'getTotalCount'}),
      manjian(){
        let yijian = 0 //已减 变量
        let haicha = 0 //还差多少变量
        let nextjian = 0 //下一个减多少
        if(this.foodShopInfo.rst){
          let attr = this.foodShopInfo.rst.activities[0].attribute
          attr = attr ? JSON.parse(attr) : ''
          const originalPrice = Number(this.getOriginalTotalPrice.total)
          for(let price in attr){
            let temp = attr[price][1]
            if(price>=originalPrice){
              haicha = price-originalPrice
              nextjian = temp
              break
            }
            if(originalPrice>price){
              yijian = temp
            }
          }
        }
        return {yijian:yijian,haicha:formateMoney(haicha),nextjian:nextjian}
      }
    },
    methods: {
      touchStart() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (document.querySelector('#res_nav').offsetTop >= scrollTop) {
          this.isScrollOk = false
        }
        if (!this.isScrollOk) {
          this.startY = event.changedTouches[0].pageY
        }
        //event.preventDefault() //阻止默认事件（长按的时候出现复制）
      },
      touchMove() { // 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
        if (!this.isScrollOk) {
          let moveEndY = event.changedTouches[0].pageY
          let Y = this.startY
          if (moveEndY < Y) {
            document.querySelector("#res_nav").scrollIntoView();
            //this.isScrollOk=true
          }
        }
      },
      showOneFoodInfo(index1,index2) {//打开食品详情页
        this.$refs.oneFoodInfoShow.oneFoodInfoShow = true
        this.showFoodInfo=this.foodShopInfo.menu[index1].foods[index2]
      },
      showSelectFood({food}){ //打开规格选择页
        this.$refs.oneFoodInfoShow.oneFoodInfoShow = false
        this.showFoodInfo = food
        this.$refs.selectFoodShow.selectShow = true
      },
      getImagePath(info) {
        return getImagePath(info)
      },
      getDiscount(ori, now) { //获取折扣
        let round = (now / ori) * 1000 % 100 > 5 ? 1 : 0
        return parseInt((now / ori) * 100 + round) / 10
      },
      foodListScroll(ev){
        let top = this.$refs.food_type_list.scrollTop+1
        const index = this.foodTypeHeight.findIndex((value)=>{
          return value>=top
        })
        this.foodNavActiveIndex = index-1
      },
      getFoodTypeHeight(){ //获取每类食物距离顶部的距离
        setTimeout(()=>{
          let topHeight = 0
          for (let one of  this.$refs.food_type_list.getElementsByClassName('one_list')){
            topHeight+=one.getBoundingClientRect().height
            this.foodTypeHeight.push(topHeight)
          }
        },500)
      },
      foodTypeNavClick(index){
        /*if(index==this.foodNavActiveIndex){
          return
        }*/
        //滚动到指定位置
        // this.$refs.food_type_list.scrollTo(0,this.foodTypeHeight[index]) //直接跳转
        this.scrollAnimation(this.$refs.food_type_list,this.foodTypeHeight[index],300) //滚动 500ms
        //alert(document.getElementById("ul1").getBoundingClientRect().height)
      },
      scrollAnimation(Ele,now,time=300){
        //滚动动画
        let ori = Ele.scrollTop
        const direction = now>ori //大于0表示向下滑动，小于向上
        let one = (now-ori)/(time/30) //每次滚动的距离
        //one = direction?one:-one
        let timer = setInterval(()=>{
          ori+=one //
          if((direction && ori>=now) || (!direction && ori<=now)){
            Ele.scrollTop = now
            clearInterval(timer)
          }else{
            Ele.scrollTop= ori
          }
        },30)
      },
      openCart(){
        this.cartFoods.length===0?(this.isOpenCart=false,this.timeOutOpacity=0):(this.isOpenCart=!this.isOpenCart,this.isOpenCart?this.timeOutOpacity=1:setTimeout(()=>{this.timeOutOpacity=0},300))
      },
      getOneTypePrice(ori,food){
        let price = 0
        if(food.specfoods.length>1){
          if(ori) {//原价
            price = food.specfoods[food.spec].original_price
          }else{
            price = food.specfoods[food.spec].price
          }
        }else{
          if(ori) {//原价
            price = food.specfoods[0].original_price
          }else{
            price = food.lowest_price
          }
        }
        return formateMoney(food.cartNumber*price)
      },
      clearCartFoods(){ //清空购物车
        this.$store.dispatch('clearCartFoods')
      },
      pay(){
        if(this.getOriginalTotalPrice.total>=20){
          if(!this.$store.state.user.phone){
            this.$router.push({path: '/login'})
          }else {
            let delivery_fee = this.foodShopInfo.rst.float_delivery_fee || 0
            this.$store.dispatch('payMoney', formateMoney(delivery_fee + this.getTotalPrice))
            let yijian = this.getOriginalTotalPrice.isDiscount ? formateMoney(this.getOriginalTotalPrice.total - this.getTotalPrice) : this.manjian.yijian
            this.$router.push({name: 'payMoney', params: {manjian: yijian}})
          }
        }
      },
      formateMoney(money){
        return formateMoney(money)
      }
    },
    components:{
      SelectFoodSpec,
      OneFoodInfoWrap,
      CartBar,//购物车加减
      OneFoodBar,
    },
  }
</script>
<style>
</style>
<style scoped>
  .content{
    display: flex;
  }
  .food_type_nav{
    width: 25%;
    min-width: 20%;
    background-color: #f8f8f8;
    justify-content: flex-start;
    overflow-y: scroll;
  }
  .food_type_nav>ul{
    padding-bottom: 100px;
  }
  .food_content{
    height: 100%;
    overflow-y: hidden;
    max-width: 80%;
  }
  .food_type_nav li{
    padding: 1rem .3rem;
    font-size: .7rem;
    text-align: left;
    line-height: 1rem;
  }
  .food_type_nav li img{
    width: .8rem;
    height: .8rem;
    margin-right: 5px;
    position: relative;
    top: 2px;
  }
  .food_type_nav .active{
    background-color: #fff;
  }
  .food_type_list{
    overflow: scroll;
    height: 100%;
  }
  .food_type_list>ul{
    padding-bottom: 60px;
  }
  .list_header{
    display: flex;
    color: #999;
    font-size: .6rem;
    letter-spacing: -.5px;
    height: 2rem;
    line-height: 2rem;
  }
  .list_header h4{
    color: #666666;
    font-weight: bold;
    margin-right: 5px;
    letter-spacing: 1px;
    font-size: .75rem;
  }
  .one_list{
    padding: 0 10px;
    box-sizing: border-box;
  }
  .bottom_cart{
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: #fff;
    z-index: 20;
  }
  .bottom_cart .tips{
    background-color: #fffad6;
    text-align: center;
    font-size: .65rem;
    /*padding: 1px 0;*/
  }
  .bottom_cart .tips p{
    line-height: .75rem;
  }
  .bottom_cart .main{
    height: 45px;
    background-color: rgba(61,61,63,.9);
    padding-left: 80px;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 13;
  }
  .bottom_cart .cart_ico{
    display: inline-block;
    position: absolute;
    left: 10px;
    top: -10px;
    height: 40px;
    width: 40px;
    border: 5px solid #444;
    background-color: #363636;
    border-radius: 100%;
    transition: transform .1s
  }
  .bottom_cart .animate1{ /*加入购物车动画*/
    transform: scale(.8);
  }
  .bottom_cart .animate2{ /*加入购物车动画*/
    transform: scale(1.1);
  }
  .bottom_cart .animate3{ /*加入购物车动画*/
    transform: scale(.9);
  }
  .bottom_cart .cart_ico_active{
    /*background-image: radial-gradient(circle,#363636 17px,#444 0);*/
    background-color: #3190e8;
  }
  .bottom_cart .cart_ico i{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTggNTgiPjxkZWZzPjxmaWx0ZXIgaWQ9ImEiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiIHg9Ii01MCUiIHk9Ii01MCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+PGZlT2Zmc2V0IGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz48ZmVHYXVzc2lhbkJsdXIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIiBzdGREZXZpYXRpb249IjEuNSIvPjxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA4IDAiLz48ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48cGF0aCBpZD0iYiIgZD0iTTcuNjE0IDQuMDUxYy0xLjA2Ni4wODYtMS40NTItLjM5OC0xLjc1Mi0xLjU4NEM1LjU2MiAxLjI4LjMzIDUuODguMzMgNS44OGwzLjcxIDE5LjQ3NmMwIC4xNDgtMS41NiA3LjUxNS0xLjU2IDcuNTE1LS40ODkgMi4xOS4yOTIgNC4yNyAzLjU2IDQuMzIgMCAwIDM2LjkxNy4wMTcgMzYuOTIuMDQ3IDEuOTc5LS4wMTIgMi45ODEtLjk5NSAzLjAxMy0zLjAzOS4wMy0yLjA0My0xLjA0NS0yLjk3OC0yLjk4Ny0yLjk5M0w4LjgzIDMxLjE5MnMuODYtMy44NjUgMS4wNzctMy44NjVjMCAwLTUuNzg4LjEyMiAzMi4wNjUtMS45NTYuNjA2LS4wMzMgMi4wMTgtLjc2NCAyLjI5OC0xLjg0OCAxLjExMy00LjMxNyA0LjAwOC0xMy4yNiA0LjQ1OC0xNS42NC45MzItNC45MjUgMi4wNjEtOC41NTgtNC4yOC03LjQwNSAwIDAtMzUuNzY4IDMuNDg3LTM2LjgzMyAzLjU3M3oiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDM4IDcuODA4KSI+PG1hc2sgaWQ9ImMiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2IiLz48L21hc2s+PHVzZSBmaWxsPSIjNUY1RjYzIiB4bGluazpocmVmPSIjYiIvPjxwYXRoIGZpbGw9IiNFQkVFRjMiIGQ9Ik01My45NjIgNy43NzRsLTUuNzAxIDE5LjMwNS00MC43OCAxLjU3NHoiIG1hc2s9InVybCgjYykiIG9wYWNpdHk9Ii4wNSIvPjwvZz48cGF0aCBzdHJva2U9IiM1RjVGNjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI2IiBkPSJNOS4zNzQgMTguNzIyUzcuODY4IDExLjI4MyA3LjMyMyA4LjcxQzYuNzc4IDYuMTM2IDUuODYgNS4zMyAzLjk3OCA0LjUyIDIuMDk2IDMuNzEzLjM2NyAyLjI4Ni4zNjcgMi4yODYiLz48Y2lyY2xlIGN4PSI0NiIgY3k9IjUxIiByPSI0IiBmaWxsPSIjNUY1RjYzIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI1MSIgcj0iNCIgZmlsbD0iIzVGNUY2MyIvPjwvZz48L3N2Zz4=) no-repeat 50%;
    background-size: 50% 50%;
  }
  .bottom_cart .cart_ico_active i{
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTggNTgiPjxkZWZzPjxmaWx0ZXIgaWQ9ImEiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiIHg9Ii01MCUiIHk9Ii01MCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+PGZlT2Zmc2V0IGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz48ZmVHYXVzc2lhbkJsdXIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIiBzdGREZXZpYXRpb249IjEuNSIvPjxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA4IDAiLz48ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48cGF0aCBpZD0iYiIgZD0iTTcuNjE0IDQuMDUxYy0xLjA2Ni4wODYtMS40NTItLjM5OC0xLjc1Mi0xLjU4NEM1LjU2MiAxLjI4LjMzIDUuODguMzMgNS44OGwzLjcxIDE5LjQ3NmMwIC4xNDgtMS41NiA3LjUxNS0xLjU2IDcuNTE1LS40ODkgMi4xOS4yOTIgNC4yNyAzLjU2IDQuMzIgMCAwIDM2LjkxNy4wMTcgMzYuOTIuMDQ3IDEuOTc5LS4wMTIgMi45ODEtLjk5NSAzLjAxMy0zLjAzOS4wMy0yLjA0My0xLjA0NS0yLjk3OC0yLjk4Ny0yLjk5M0w4LjgzIDMxLjE5MnMuODYtMy44NjUgMS4wNzctMy44NjVjMCAwLTUuNzg4LjEyMiAzMi4wNjUtMS45NTYuNjA2LS4wMzMgMi4wMTgtLjc2NCAyLjI5OC0xLjg0OCAxLjExMy00LjMxNyA0LjAwOC0xMy4yNiA0LjQ1OC0xNS42NC45MzItNC45MjUgMi4wNjEtOC41NTgtNC4yOC03LjQwNSAwIDAtMzUuNzY4IDMuNDg3LTM2LjgzMyAzLjU3M3oiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDM4IDcuODA4KSI+PG1hc2sgaWQ9ImMiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2IiLz48L21hc2s+PHVzZSBmaWxsPSIjRkZGIiB4bGluazpocmVmPSIjYiIvPjxwYXRoIGZpbGw9IiMyMDczQzEiIGQ9Ik01My45NjIgNy43NzRsLTUuNzAxIDE5LjMwNS00MC43OCAxLjU3NHoiIG1hc2s9InVybCgjYykiIG9wYWNpdHk9Ii4xIi8+PC9nPjxwYXRoIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjYiIGQ9Ik05LjM3NCAxOC43MjJTNy44NjggMTEuMjgzIDcuMzIzIDguNzFDNi43NzggNi4xMzYgNS44NiA1LjMzIDMuOTc4IDQuNTIgMi4wOTYgMy43MTMuMzY3IDIuMjg2LjM2NyAyLjI4NiIvPjxjaXJjbGUgY3g9IjQ2IiBjeT0iNTEiIHI9IjQiIGZpbGw9IiNGRkYiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjUxIiByPSI0IiBmaWxsPSIjRkZGIi8+PC9nPjwvc3ZnPg==)  no-repeat 50%;
    background-size: 50% 50%;
  }
  .bottom_cart .main_left{
    padding: 5px 0;
    color: #999;
  }
  .main_left h3:before,.main_left h3 del:before{
    content: '￥';
  }
  .bottom_cart .main_left h3{
    z-index: 30;
    color: #fff;
    font-size: 1rem;
  }
  .main_left h3 del{
    font-size: .75rem;
    color: #999;
    font-weight: lighter;
    margin-left: 3px;
  }
  .main_left p{
    font-size: .6rem;
  }
  .main_left .nothing,.main_left h3{
    font-size: .75rem;
    height: 1.25rem;
    line-height: 1.25rem;
  }
  .main_right{
    color: #fff;
    font-weight: bold;
    font-size: .9rem;
    height: 100%;
    width: 100px;
    text-align: center;
    line-height: 45px;
    background-color: #535356;
  }
  .main_right .mode2{
    font-size: .75rem;
    letter-spacing: -1px;
  }
  .delivery_active{
    background-color: #38ca73;
  }
  .cart_ico .number{
    position: absolute;
    top: -5px;
    right: 0;
    background:linear-gradient(-90deg,#ff7416,#ff3c15 98%);
    color: #fff;
    font-size: .6rem;
    padding: 3px;
    width: 10px;
    height: 8px;
    border-radius: 50%;
    line-height: .6rem;
    text-align: center;
  }
  .cart_info_mask{ /*查看购物车详情遮罩层*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.4);
  }
  /*购物车列表css*/
  .trans_wrap{
    position: fixed;
    left: 0;
    width: 100%;
    background-color: #fff;
    bottom: 57px;
    transition: transform .3s;
    transform: translate3d(0,100%,0);
    z-index: 13;
  }
  .trans_wrap_active{
    transform: translateZ(0);
    bottom:45px;
  }
  .cart_info{
    padding-bottom: 10px;
    opacity: 0;
  }
  .cart_info .head{
    height: 2rem;
    line-height: 2rem;
    background-color: #eceff1;
    color: #666;
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    padding: 5px 13px;
    border-bottom: .05rem solid #ddd;
  }
  .cart_info .head .icon{
    position: relative;
    top: 1px;
    left: 3px;
  }
  .cart_info .cart_clear_text{
    font-size: .85rem;
  }
  .cart_list{
    margin-left: 13px;
    overflow-y: auto;
  }
  .cart_list li{
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    color: #333;
    border-bottom: .05rem solid #ddd;
    padding: 10px 0;
    vertical-align: middle;
    overflow: hidden;
  }
  .cart_list .cart_food_name{
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 2rem;
  }
  .cart_food_name em{
    font-style: normal;
    font-size: .5rem;color: #999;
    line-height: .6rem;
  }
  .cart_list .right_info{
    display: flex;
    align-items: center;
  }
  .cart_list .right_info del{
    font-size: .5rem;
    color: #999;
    margin-right: 5px;
    padding-top: 5px;
    letter-spacing: -1px;
  }
  .cart_list .right_info>span{
    color: red;
    margin-right: 10px;
  }
  .cart_list .right_info small{
    font-size: .5rem;
  }
  .cart_list .right_info p{
    display: flex;
    line-height: 1.5rem;
    padding-right: 15px;
  }
  .cart_list .right_info p span{
    width: 1rem;
    text-align: center;
  }
  .cart_list .right_info .icon{
    font-size: 1.5rem;
  }
  /*动画*/
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

<template>
    <section>
      <RestaurantHeader ></RestaurantHeader>
      <nav id="res_nav">
        <a :class="{active_hover:activePage==1}" @click="activePage=1"><span>点餐</span></a>
        <a :class="{active_hover:activePage==2}"  @click="ratingClick"><span>评价</span></a>
        <a :class="{active_hover:activePage==3}"  @click="infoClick"><span>商家</span></a>
      </nav>
      <RestaurantHome v-show="activePage===1" :contentHeight="contentHeight+'px'"></RestaurantHome>
      <RestaurantRating :isRatingShow="isRatingShow" v-show="activePage===2"></RestaurantRating>
      <RestaurantInfo v-show="activePage===3"></RestaurantInfo>
    </section>
</template>

<script>
  import RestaurantHeader from '../../components/RestaurantHeader/RestaurantHeader'
  import RestaurantHome from '../../components/RestaurantHome/RestaurantHome'
  import RestaurantInfo from '../../components/RestaurantInfo/RestaurantInfo'
  import RestaurantRating from '../../components/RestaurantRating/RestaurantRating'
  import {mapActions} from 'vuex'
  import {getUrlParams} from "../../utils/getImagePath";
  import {MessageBox} from 'mint-ui';

  export default {
      name: "Restaurant",
      components:{
        RestaurantHeader,
        RestaurantHome,
        RestaurantInfo,
        RestaurantRating,
      },
      data(){
        return{
          contentHeight:0,
          activePage:1, //导航页面
          isRatingShow:false, //是否显示评价页面,控制懒加载
          isInfoShow:false, //是否显示店铺页面,控制懒加载
        }
      },
      mounted(){
        this.contentHeight = screen.height-document.getElementById('res_nav').offsetHeight //导航条距离顶部距离
        this.getFoodShop()
      },
      computed:{
      },
    methods:{
      ...mapActions({getFoodsShop:'getFoodsShop'}),
      getFoodShop(){ //异步获取店铺食品信息
        const restaurant_id = getUrlParams('id');
        if(restaurant_id==''){
          this.alertInfo()
          return
        }
        this.getFoodsShop(restaurant_id)
      },
      alertInfo(text='店铺不存在！！！'){ //弹出框
        MessageBox.alert(text)
          .then(action => {
            this.$router.replace('/home')
          })
      },
      ratingClick(){
        this.activePage = 2
        if(!this.isRatingShow){
          this.isRatingShow = true
        }
      },
      infoClick(){
        this.activePage = 3
        if(!this.isInfoShow){
          this.isInfoShow = true
        }
      }
    }
  }
</script>

<style scoped>
  nav{
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    border-bottom: .5px dashed #eee;
    background-color: #fff;
    padding:5px 0;
    z-index: 2;
    box-sizing: border-box;
  }
  nav a{
    flex: 1;
    display: inline-block;
    text-decoration: none;
    font-size: .9rem;
    color: #333;
    text-align: center;
    line-height: 30px;
  }
  nav .active_hover{
    font-weight: bold;
    color: #333;
  }
  nav .active_hover span{
    display: inline-block;
    box-sizing: border-box;
    border-bottom: 2px solid #007aff;
  }
</style>

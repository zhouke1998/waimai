<template>
    <section>
      <HeaderTop :title="Address">
        <div class="searchWrap left" slot="left">
          <router-link to="/search" class="">
            <span class="iconfont icon-search"></span>
          </router-link>
        </div>
        <div class="right" slot="right">
          <router-link :to="getPhone==null?'/login':'/personInfo'">
            <span v-if="getPhone==null">
              <a>登录</a>|
              <a>注册</a>
            </span>
            <span v-else>
              <span class="iconfont icon-wode"></span>
            </span>
            </router-link>
        </div>
      </HeaderTop>
      <!--swiper分页-->
      <!--<div class="swiper-container">
        <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
    </div>
      &lt;!&ndash; 如果需要分页器 &ndash;&gt;
      <div class="swiper-pagination"></div>

      &lt;!&ndash; 如果需要导航按钮 &ndash;&gt;
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      &lt;!&ndash; 如果需要滚动条 &ndash;&gt;
      <div class="swiper-scrollbar"></div>
      </div>-->
      <div class="kinds swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(type_list,index0) in type_listArr" :key="index0">
            <ul>
              <li v-for="(type,index1) in type_list" :key="index1" @click="classify(index0,index1)">
                <a>
                  <span><img :src="type_list_baseUrl+type.image_hash+'.jpeg'"/></span>
                  <p>{{type.name}}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!--分页器-->
        <div class="swiper-pagination"></div>
      </div>
      <ShopList>
        <h2 slot="header">
          <a>
            <span class="iconfont icon-tuanduicankaoxian-1 fujin"></span>
            附近商家
          </a>
        </h2>
      </ShopList>
      <!--<keep-alive include="ShopList">
      </keep-alive>-->
    </section>
</template>

<script>
  import HeaderTop from "../../components/Headertop/HeaderTop";
  import ShopList from "../../components/ShopList/ShopList"
  import Swiper from "swiper"
  import "swiper/dist/css/swiper.min.css"  //swiper滑块css
  export default {
    name: 'Home',
    data(){
      return{
        type_list_baseUrl:"waimai_api/images/type_list/",
      }
    },
    computed:{
      Address(){
        return this.$store.state.address.address
      },
      type_listArr(){
        let type_list = this.$store.state.type_list
        let barr =  []
        let sarr = []
        type_list.forEach((value,index)=>{
          if(index%10==0){
            sarr=[]
            barr.push(sarr)
          }
          sarr.push(value)
        })
        //console.log(barr);
        return barr
      },
      getPhone(){
        return this.$store.state.user.phone
      }
    },
    watch:{
      type_listArr(value){
        //dom渲染完成后进行此操作
        this.$nextTick(()=>{
          //创建swiper对象
          this.reloadSwiper();
        })
      }
    },
    created(){
      if(!this.$store.state.type_list.length){
        this.$store.dispatch("getType_list")
      }
    },
    mounted() {
      if(this.$store.state.type_list.length){
        this.reloadSwiper();
      }
    },
    components: {ShopList, HeaderTop},
    methods: {
      classify(index0,index1){
        const index = index0*10+index1;
        this.$router.push({path:"/classify",query:{classify:index}})
      },
      reloadSwiper(){
        new Swiper('.swiper-container', {
          //loop: false,
          // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          }
        })
      }
    }
  }

</script>

<style scoped>
  .header span{
    height: 100%;
    line-height: 50px;
    color: #fffeee;
    text-align: center;
    font-size: 1.3rem;
  }
  .header .left{
    width: 25%;
    box-sizing: border-box;
    vertical-align: center;
  }
  .header .left a{
    height: 100%;
    min-width: 50%;
    text-align: center;
    padding-top: 2px;
    box-sizing: border-box;
  }
  .header .right{
    width: 25%;
    text-align: right;
  }

  .header .right .icon-wode {
    font-size: 1.5rem;
    padding-right: 10px;
  }
  .header .right>a{
    height: 100%;
    padding-top: 2px;
    box-sizing: border-box;
  }
  .header .right span a{
    margin-right: 3px;
  }
  .header .right span{
    font-size: 0.75rem;
  }
  .kinds{
    width: 100%;
    box-sizing: border-box;
    /*padding: 10px 10px;*/
    height: 200px;
    border-bottom: 5px solid #ddd;
  }
  .swiper-slide{
    box-sizing: border-box;
    padding: 10px;
  }
  .kinds ul{
    width: 100%;
    height: 90%;
    overflow: hidden;
  }
  .kinds ul li{
    width: 20%;
    height: 50%;
    float: left;
    box-sizing: border-box;
    padding: 5px;
    overflow: hidden;
  }
  .kinds ul a{
    display: inline-block;
    text-align: center;
  }
  .kinds li span{
    display: inline-block;
    width: 100%;
    text-align: center;
    max-width: 60px;
  }
  .kinds li img{
    width: 70%;
    height: 70%;
    object-fit: cover;
    margin: 0 auto;
    border-radius: 50%;
  }
  .kinds li p{
    text-align: center;
    font-size: 0.7rem;
    color: #999;
    height: 30%;
  }

</style>

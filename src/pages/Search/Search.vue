<template>
    <section>
      <div class="search-top">
        <HeaderTop title="搜索"></HeaderTop>
        <div class="search">
          <input maxlength="10" class="key" v-model="keyWord" type="text"/>
          <a class="sub" @click="searchClick">搜索</a>
        </div>
      </div>
      <div class="content">
        <div class="search_content">
          <ul class="item-list"
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="isGettingShop"
              infinite-scroll-distance="-30">
            <li v-for="(restaurant,index_0) in restaurants" :shop_index="index_0"
                @click="$router.push(`/restaurant?id=${restaurant.id}`)">
              <div>
                <ShopCover :restaurant="{restaurant,index_0}"></ShopCover>
              </div>
            </li>
          </ul>
          <div class="bottom-tips">
            <mt-spinner v-show="isGettingShop && isStartSearch" color="#02a774" :size="20"
                        type="fading-circle"></mt-spinner>
            <p style="text-align: center" v-show="daodile">没有更多了...</p>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
  import HeaderTop from "../../components/Headertop/HeaderTop";
  import ShopCover from '../../components/ShopList/ShopCover/ShopCover'
  import {Toast} from 'mint-ui'
  import {searchRestaurants} from "../../api";

  export default {
    data() {
      return {
        restaurants: [],//存储餐馆信息
        page: 0, //页数
        limit: 8, //每页的个数
        show_num: [], //存储点击展开
        isStartSearch: false,
        isGettingShop: true,//
        daodile: false,
        keyWord: '',//关键字
        searchingKeyWord: '',//当前正在搜索的关键词
      }
    },
    methods: {
      //获取restaurant
      getRestaurants(page) {
        this.isGettingShop = true
        let offset = (page - 1) * this.limit
        searchRestaurants(offset, this.limit, this.searchingKeyWord)
          .then(data => {
            if (data.status === 0) {
              if (data.restaurants.length < this.limit) {
                this.daodile = true
              }
              for (let restaurant of data.restaurants) {
                this.restaurants.push(restaurant)
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
      searchClick() {
        if (this.$store.state.address.status !== 0) { //判断是否获取过地址
          Toast({
            message: '请先获取地址再重试！',
            position: 'middle',
            duration: 1500
          });
        } else if (!/^(\w|[\u4e00-\u9fa5]){1,10}$/.test(this.keyWord)) {
          Toast({
            message: '请重新输入！',
            position: 'middle',
            duration: 1500
          });
          this.keyWord = ''
        } else {
          this.page = 1;
          this.daodile = false;
          this.searchingKeyWord = this.keyWord;
          this.getRestaurants(1);
          this.isStartSearch = true;
          this.restaurants = [];
        }
      }
    },
    mounted() {
    },
    name: 'Search',
    components: {ShopCover, HeaderTop}
  }
</script>

<style scoped>
  section{
    position: unset;
  }
  .search{
    padding: 15px;
    zoom: 1;
    /*** border-bottom: 1px solid #ddd; **/
  }
  .search-top{
    position: sticky;
    top: 0;
    left: 0;
    z-index: 11;
    background-color: #fff;
  }
  .search:after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0
  }
  .search .key{
    float: left;
    width: 70%;
    outline: none;
    background-color: #eee;
    padding: 0px 10px;
    border: none;
    border-radius: 5px;
    line-height: 30px;
    height: 35px;
    box-sizing: border-box;
    font-size: 1rem;
  }
  .search .sub{
    float: right;
    width: 25%;
    display: inline-block;
    height: 35px;
    background: #02a774;
    max-width: 200px;
    min-width: 80px;
    font-size: 1rem;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    font-weight: bold;
    line-height: 35px;
  }
  .content{
  }

  .search_content {
  }

  .item-list {

  }

  .item-list li {
    padding: 10px;
    border-bottom: 1px solid #dddddd;
    position: relative;
  }
  .result{
    width: 100%;
    height: 100%;
    padding-bottom: 170px;
    overflow: scroll;
    box-sizing: border-box;
  }
  .result ul{
    overflow: hidden;
    zoom: 1;
  }
  .result li{
    height: 80px;
    padding: 15px;
  }
  .result li>a{
    display: inline-block;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #bbb;
    box-sizing: border-box;
    padding-top: 10px;
  }
  .result .img img{
    width: 60px;
    height: 60px;

  }
  .result .img{
    float: left;
  }
  .result .info{
    margin-left: 15px;
    float: left;
    width: 60%;
    max-width: 200px;
  }
  .shops a>div{
    float: left;
    height: 100%;
    display: inline-block;
    width: 70%;
    box-sizing: border-box;
  }
  .result h3{
    line-height: 25px;
  }
  .result .xiaoshou{
    height: 20px;
  }
  .result .xiaoshou span{
    font-size: 0.9rem;
    color: #333;
    letter-spacing: 1px;
  }
  .result .peisong{
    height: 20px;
  }
  .result .peisong span{
    font-size: 0.9rem;
    color: #333;
    margin: 3px;
  }
  .bottom-tips{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding-bottom: 50px;
  }
</style>

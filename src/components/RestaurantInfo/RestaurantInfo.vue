<template>
  <section class="restaurantInfo">
    <Story v-if="$parent.isInfoShow && getRst.has_story"></Story>
    <section v-if="getRst" class="content">
      <div class="peisong">
        <h3>配送信息</h3>
        <p>由{{getRst.delivery_mode.text}}提供配送，约<span>{{calTime(getRst.order_lead_time)}}</span>送达，距离<span>{{getDistance(getRst.distance)}}</span></p>
        <span>配送费￥{{getRst.float_delivery_fee}}</span>
      </div>
      <div class="service" v-if="getRst.supports && getRst.supports.length">
        <h3>商家服务</h3>
        <div v-for="(support,index) in getRst.supports">
          <span class="tip">{{support.icon_name}}</span>
          <span>{{support.description}}</span>
        </div>
      </div>
      <div class="shijin" v-if="getRst.albums && getRst.albums.length">
        <h3>商家实景</h3>
        <div>
          <div v-for="(album,index) in getRst.albums">
            <img :src="getImagePath({image_hash:album.cover_image_hash,suffix:'imageMogr/format/webp/thumbnail/!200x200r/gravity/Center/crop/200x200/'})" />
            <span>{{album.name}}</span>
          </div>
        </div>
      </div>
      <div class="info">
        <h3>商家信息</h3>
        <p>{{getRst.description?getRst.description:'暂无简介'}}</p>
        <ul>
          <li v-if="getRst.flavors && getRst.flavors.length">
            <span>品类</span>
            <span>{{calFlavors(getRst.flavors)}}</span>
          </li>
          <li v-if="getRst.phone" >
            <span>商家电话</span>
            <a :href="`tel:+${getRst.phone.split(' ')[0]}`">
              <span>{{getRst.phone.split(' ')[0]}}
                <span  class="iconfont icon-jiantou"></span>
              </span>
            </a>
          </li>
          <li v-if="getRst.address">
            <span>地址</span>
            <span>{{getRst.address}}</span>
          </li>
          <li v-if="getRst.opening_hours">
            <span>营业时间</span>
            <span>{{getRst.opening_hours[0].replace('/','-')}}</span>
          </li>
        </ul>
      </div>
      <div class="qualify">
          <span>营业资质</span>
          <router-link :to="`certification?id=${$store.state.foodsShop.restaurant_id}`" append>
            <span><span class="iconfont icon-jiantou"></span></span>
          </router-link>
      </div>
    </section>
  </section>

</template>

<script>
  import Story from './Story/Story'
  import {getImagePath} from "../../utils/getImagePath";
  export default {
      data(){
        return{
        }
      },
      mounted(){
      },
      computed:{
        getRst(){
          return this.$store.state.foodsShop.rst
        },
      },
      methods:{
        calTime(minute){ //计算配送时间
          if(minute<=60){
            return minute+'分钟'
          }else{
            return minute/60+'小时'+minute%60+'分钟'
          }
        },
        getDistance(dis){
          if(dis<1000){
            return dis+'m'
          }
          return Math.round(dis/100)/10+'km'
        },
        getImagePath(info){
          return getImagePath(info)
        },
        calFlavors(flavorsArr){
          //计算标签
          let temp = []
          for(let flavor of flavorsArr){
            temp.push(flavor.name)
          }
          return temp.join(',')
        }
      },
      components:{
        Story,
      }
    }
</script>

<style scoped>
  .restaurantInfo{
    background-color: #f5f5f5;
    color: #333;
  }
  a{
    display: inline-block;
    text-decoration: none;
    color: inherit;
    width: 100%;
  }
  .content>div{
    padding: 1rem;
    margin-bottom: .8rem;
    background-color: #fff;
    color: #666;
    font-size: .8rem;
  }
  .content h3{
    color: #333;
    margin-bottom: 1rem;
  }
  .service .tip{
    display: inline-block;
    padding: 0 4px;
    border: 1px solid #ddd;
    color: #aaa;
    font-size: .7rem;
  }
  .shijin{
  }
  .shijin>div{
    display: flex;
  }
  .shijin>div>div{
    width: 23%;
    margin-right: 5px;
    position: relative;
  }
  .shijin img{
    width: 100%;
    vertical-align: top;
  }
  .shijin span{
    background-color: rgba(0,0,0,.6);
    display: inline-block;
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    color: #fff;
  }
  .content .info{
    padding-right: 0;
  }
  .info p{
    padding-right: 1rem;
    font-size: .78rem ;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1rem;
  }
  .info li,.qualify{
    padding: 1rem .7rem 1rem 0;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .info li>span:last-child,.info li>a,.qualify a{
    width: 70%;
    text-align: right;
  }
  .info li>span:first-child{
    font-weight: bold;
    color: #333;
  }
  .iconfont{
    font-size: .65rem;
  }
  .info li:last-child,.qualify{
    border-bottom: none;
    padding-bottom: 0;
  }
  .content .qualify{
    margin:0
  }
  .qualify>span{
    font-weight: bold;
    color: #000;
    font-size: .9rem;
  }
</style>
